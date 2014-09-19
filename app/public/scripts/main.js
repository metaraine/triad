(function() {
  angular.module('triad', []);

}).call(this);

(function() {
  angular.module('triad').controller('TriadAppCtrl', ["$scope", "PIXI", "TrianglePerson", "$timeout", "_", function($scope, PIXI, TrianglePerson, $timeout, _) {
    var people;
    $scope.pixiRender = function(stage, renderer) {
      var person, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = people.length; _i < _len; _i++) {
        person = people[_i];
        _results.push(person.animate());
      }
      return _results;
    };
    $scope.stage = new PIXI.Stage(0x66ff99);
    $scope.config = {
      personSize: 20,
      numPeople: 4,
      velocity: 2
    };
    people = [];
    return $timeout(function() {
      var firstTarget, i, notSelf, notSelfOrFirst, person, secondTarget, size, x, y, _i, _len, _results;
      people = (function() {
        var _i, _ref, _results;
        _results = [];
        for (i = _i = 1, _ref = $scope.config.numPeople; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
          x = Math.random() * $scope.parentSize.width;
          y = Math.random() * $scope.parentSize.height;
          size = $scope.config.personSize;
          person = new TrianglePerson(x, y, size);
          person.velocity = $scope.config.velocity;
          $scope.stage.addChild(person);
          _results.push(person);
        }
        return _results;
      })();
      _results = [];
      for (_i = 0, _len = people.length; _i < _len; _i++) {
        person = people[_i];
        notSelf = people.filter(function(p) {
          return p !== person;
        });
        firstTarget = _.sample(notSelf);
        notSelfOrFirst = notSelf.filter(function(p) {
          return p !== firstTarget;
        });
        secondTarget = _.sample(notSelfOrFirst);
        person.targets = [firstTarget, secondTarget];
        _results.push(person.draw());
      }
      return _results;
    });
  }]);

}).call(this);

(function() {
  angular.module("triad").directive("pixi", ["$parse", function($parse) {
    return {
      restrict: "A",
      scope: false,
      controller: ["$scope", "$element", "$attrs", "$timeout", "PIXI", function($scope, $element, $attrs, $timeout, PIXI) {
        var antialias, renderFunc, renderer, rendererType, self, stage, stageAttr, transparent;
        self = this;
        renderer = null;
        this.start = function() {
          var renderLoop;
          renderLoop = function() {
            self.render();
            return requestAnimFrame(renderLoop);
          };
          this.setRenderer();
          $attrs.$observe('width', this.resize);
          $attrs.$observe('height', this.resize);
          return requestAnimFrame(renderLoop);
        };
        this.setRenderer = function() {
          switch (rendererType) {
            case "canvas":
              return renderer = new PIXI.CanvasRenderer($element[0].width, $element[0].height, $element[0], transparent);
            case "webgl":
              return renderer = new PIXI.WebGLRenderer($element[0].width, $element[0].height, $element[0], transparent, antialias);
            default:
              return renderer = PIXI.autoDetectRenderer($element[0].width, $element[0].height, $element[0], antialias, transparent);
          }
        };
        this.render = function(force) {
          renderFunc(stage, renderer);
          return renderer.render(stage);
        };
        this.getStage = function() {
          return stage;
        };
        this.getRenderer = function() {
          return renderer;
        };
        this.getContext = function() {
          if (renderer.gl) {
            return renderer.gl;
          } else {
            return renderer.context;
          }
        };
        this.resize = function() {
          return renderer.resize($attrs.width, $attrs.height);
        };
        stageAttr = $parse($attrs.pixi);
        stage = stageAttr($scope);
        renderFunc = $scope.$eval($attrs.pixiRender);
        antialias = $scope.$eval($attrs.pixiAntialias || "false");
        transparent = $scope.$eval($attrs.pixiTransparent || "false");
        rendererType = $scope.$eval($attrs.pixiRenderer || "auto");
        if (!stage) {
          stage = new PIXI.Stage($scope.$eval($attrs.pixiBackground || "0"));
          stageAttr.assign($scope, stage);
        }
        return $timeout(this.start.bind(this));
      }]
    };
  }]);

}).call(this);

(function() {
  angular.module("triad").directive("resize", ["$window", function($window) {
    return function(scope, element, attr) {
      var getParentSize, w;
      getParentSize = function() {
        return {
          width: element.parent()[0].offsetWidth,
          height: element.parent()[0].offsetHeight
        };
      };
      scope.$watch(getParentSize, (function(newValue, oldValue) {
        return scope.parentSize = newValue;
      }), true);
      w = angular.element($window);
      return w.bind("resize", function() {
        return scope.$apply();
      });
    };
  }]);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('triad').factory('TrianglePerson', function() {
    var TrianglePerson;
    TrianglePerson = (function(_super) {
      var midpoint, vertices;

      __extends(TrianglePerson, _super);

      midpoint = function(p1, p2) {
        return {
          x: (p1.x + p2.x) / 2,
          y: (p1.y + p2.y) / 2
        };
      };

      vertices = function(a, b) {
        var c60, dx, dy, nc60, ns60, s60;
        dx = a.x - b.x;
        dy = a.y - b.y;
        s60 = Math.sin(Math.PI / 3);
        c60 = Math.cos(Math.PI / 3);
        ns60 = Math.sin(-Math.PI / 3);
        nc60 = Math.cos(-Math.PI / 3);
        return [
          {
            x: c60 * dx - s60 * dy + b.x,
            y: s60 * dx + c60 * dy + b.y
          }, {
            x: nc60 * dx - ns60 * dy + b.x,
            y: ns60 * dx + nc60 * dy + b.y
          }
        ];
      };

      function TrianglePerson(x, y, size, rotation) {
        TrianglePerson.__super__.constructor.call(this);
        this.size = size;
        this.x = x || 0;
        this.y = y || 0;
        this.vx = 0;
        this.vy = 0;
        this.rotation = rotation || 0;
      }

      TrianglePerson.prototype.draw = function() {
        this.beginFill(0x6699ff);
        this.moveTo(0, -this.size / 3);
        this.lineTo(this.size, 0);
        this.lineTo(0, this.size / 3);
        this.lineTo(0, -this.size / 3);
        return this.endFill();
      };

      TrianglePerson.prototype.animate = function() {
        var closestDistance, dx, dy, mid, moveAngle, roughDistances, targetVertex, verts;
        if (this.targets && this.targets.length === 2) {
          mid = midpoint(this.targets[0], this.targets[1]);
          this.face(mid.x, mid.y);
          verts = vertices(this.targets[0], this.targets[1]);
          roughDistances = verts.map(this.roughDistance.bind(this));
          closestDistance = Math.min.apply(null, roughDistances);
          targetVertex = verts[roughDistances.indexOf(closestDistance)];
          moveAngle = -Math.atan2(targetVertex.y - this.y, targetVertex.x - this.x);
          dx = this.velocity * Math.cos(moveAngle);
          dy = -this.velocity * Math.sin(moveAngle);
          if (Math.sqrt(closestDistance) > 2 * this.velocity) {
            this.x += dx;
            return this.y += dy;
          }
        }
      };

      TrianglePerson.prototype.face = function(x, y) {
        return this.rotation = -Math.atan2(this.y - y, x - this.x);
      };

      TrianglePerson.prototype.roughDistance = function(p) {
        return Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2);
      };

      return TrianglePerson;

    })(PIXI.Graphics);
    return TrianglePerson;
  });

}).call(this);

(function() {
  angular.module('triad').factory('PIXI', function() {
    return window.PIXI;
  });

}).call(this);

(function() {
  angular.module('triad').factory('_', function() {
    return window._;
  });

}).call(this);
