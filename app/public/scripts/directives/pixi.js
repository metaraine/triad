(function() {
  angular.module("triad").directive("pixi", function($parse) {
    var postLink;
    return {
      restrict: "A",
      scope: false,
      controller: postLink = function($scope, $element, $attrs) {
        var antialias, e, render, renderFunc, renderLoop, renderer, rendererType, self, stage, stageAttr, transparent;
        renderLoop = function() {
          self.render();
          return requestAnimFrame(renderLoop);
        };
        self = this;
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
        renderer = void 0;
        switch (rendererType) {
          case "canvas":
            renderer = new PIXI.CanvasRenderer($element.width(), $element.height(), $element[0], transparent);
            break;
          case "webgl":
            try {
              renderer = new PIXI.WebGLRenderer($element.width(), $element.height(), $element[0], transparent, antialias);
            } catch (_error) {
              e = _error;
              $scope.$emit("pixi.webgl.init.exception", e);
            }
            break;
          default:
            renderer = PIXI.autoDetectRenderer($element.width(), $element.height(), $element[0], antialias, transparent);
        }
        this.render = render = function(force) {
          var doRender;
          doRender = true;
          if (renderFunc) {
            doRender = renderFunc(stage, renderer);
          }
          if (force || doRender !== false) {
            return renderer.render(stage);
          }
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
