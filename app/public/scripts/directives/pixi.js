(function() {
  angular.module("triad").directive("pixi", function($parse) {
    var postLink;
    return {
      restrict: "A",
      scope: false,
      controller: postLink = function($scope, $element, $attrs, $window, $timeout) {
        var antialias, renderFunc, renderer, rendererType, self, stage, stageAttr, transparent, w;
        self = this;
        renderer = null;
        this.start = function() {
          var renderLoop;
          renderLoop = function() {
            self.render();
            return requestAnimFrame(renderLoop);
          };
          this.setRenderer();
          this.resize();
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
          return renderer.resize($element[0].width, $element[0].height);
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
        w = angular.element($window);
        w.bind('resize', this.resize);
        return $timeout(this.start.bind(this));
      }
    };
  });

}).call(this);
