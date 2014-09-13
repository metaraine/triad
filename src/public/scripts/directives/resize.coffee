# Based on http://stackoverflow.com/questions/23044338/window-resize-directive

angular.module("triad")

.directive "resize", ($window)->
	(scope, element, attr)->

		# returns an object with the parent element's width and height
		getParentSize = ->
			width: element.parent()[0].offsetWidth
			height: element.parent()[0].offsetHeight

		# have the scope watch if the parent size changes
		scope.$watch getParentSize, ((newValue, oldValue) ->
			scope.parentSize = newValue
		), true

		# on window resize, run the digest loop
		w = angular.element($window)
		w.bind "resize", ->
			scope.$apply()
