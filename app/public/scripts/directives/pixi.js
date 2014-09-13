(function() {
  angular.module("triad").directive("pixi", function($parse) {
    var postLink;
    return {
      restrict: "A",
      scope: false,
      controller: postLink = function($scope, $element, $attrs, $window) {
        var antialias, render, renderFunc, renderLoop, renderer, rendererType, self, stage, stageAttr, transparent;
        self = this;
        $element[0].width = $window.innerWidth * .99;
        $element[0].height = $window.innerHeight * .99;
        renderLoop = function() {
          self.render();
          return requestAnimFrame(renderLoop);
        };
        stageAttr = $parse($attrs.pixi);
        stage = stageAttr($scope);
        renderFunc = $scope.$eval($attrs.pixiRender);
        if (!stage) {
          stage = new PIXI.Stage($scope.$eval($attrs.pixiBackground || "0"));
          stageAttr.assign($scope, stage);
        }
        antialias = $scope.$eval($attrs.pixiAntialias || "false");
        transparent = $scope.$eval($attrs.pixiTransparent || "false");
        rendererType = $scope.$eval($attrs.pixiRenderer || "auto");
        switch (rendererType) {
          case "canvas":
            renderer = new PIXI.CanvasRenderer($element[0].width, $element[0].height, $element[0], transparent);
            break;
          case "webgl":
            renderer = new PIXI.WebGLRenderer($element[0].width, $element[0].height, $element[0], transparent, antialias);
            break;
          default:
            renderer = PIXI.autoDetectRenderer($element[0].width, $element[0].height, $element[0], antialias, transparent);
        }
        this.render = render = function(force) {
          renderFunc(stage, renderer);
          return renderer.render(stage);
        };
        requestAnimFrame(renderLoop);
        this.getStage = function() {
          return stage;
        };
        this.getRenderer = function() {
          return renderer;
        };
        return this.getContext = function() {
          if (renderer.gl) {
            return renderer.gl;
          } else {
            return renderer.context;
          }
        };
      }
    };
  });

}).call(this);
