(function() {
  angular.module("triad").directive("resize", function($window) {
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
  });

}).call(this);
