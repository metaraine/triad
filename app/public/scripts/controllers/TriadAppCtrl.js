(function() {
  angular.module('triad', []).factory('PIXI', function() {
    return PIXI;
  }).factory('PersonGraphic', function() {
    return function(x, y, size, rotation) {
      var person;
      person = new PIXI.Graphics();
      size = size || 20;
      person.beginFill(0x6699ff);
      person.moveTo(0, -size / 2);
      person.lineTo(size / 2, size / 2);
      person.lineTo(-size / 2, size / 2);
      person.lineTo(0, -size / 2);
      person.endFill();
      person.position.x = x || 0;
      person.position.y = y || 0;
      person.vx = 0;
      person.vy = 0;
      person.ax = 0;
      person.ay = 0;
      person.rotation = rotation || 0;
      person.animate = function() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx += this.ax;
        return this.vy += this.ay;
      };
      person.face = function(x, y) {
        return this.rotation = Math.atan((this.position.y - y) / (this.position.x - x)) - Math.PI / 2;
      };
      return person;
    };
  }).controller('TriadAppCtrl', function($scope, PIXI, PersonGraphic, $timeout) {
    var people;
    $scope.pixiRender = function(stage, renderer) {
      var person, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = people.length; _i < _len; _i++) {
        person = people[_i];
        person.animate();
        _results.push(person.face(0, 0));
      }
      return _results;
    };
    $scope.stage = new PIXI.Stage(0x66ff99);
    $scope.config = {
      numPeople: 35,
      personSize: 20,
      velocity: 0.5
    };
    people = [];
    return $timeout(function() {
      var i, person, size, x, y;
      return people = (function() {
        var _i, _ref, _results;
        _results = [];
        for (i = _i = 1, _ref = $scope.config.numPeople; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
          x = Math.random() * $scope.parentSize.width;
          y = Math.random() * $scope.parentSize.height;
          size = $scope.config.personSize;
          person = PersonGraphic(x, y, size);
          person.vx = Math.random() * $scope.config.velocity - $scope.config.velocity / 2;
          person.vy = Math.random() * $scope.config.velocity - $scope.config.velocity / 2;
          $scope.stage.addChild(person);
          _results.push(person);
        }
        return _results;
      })();
    });
  });

}).call(this);
