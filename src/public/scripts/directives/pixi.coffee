angular.module("triad").directive "pixi", ($parse) ->

	# template: '<canvas></canvas>',
	restrict: "A"
	scope: false
	controller: postLink = ($scope, $element, $attrs) ->

		# create a new instance of a pixi stage

		# create a renderer instance.

		# render the stage
		renderLoop = ->
			self.render()
			requestAnimFrame renderLoop
		self = this
		stageAttr = $parse($attrs.pixi)
		stage = stageAttr($scope)
		renderFunc = $scope.$eval($attrs.pixiRender)
		unless stage
			stage = new PIXI.Stage($scope.$eval($attrs.pixiBackground or "0"))
			stageAttr.assign $scope, stage
		antialias = $scope.$eval($attrs.pixiAntialias or "false")
		transparent = $scope.$eval($attrs.pixiTransparent or "false")
		rendererType = $scope.$eval($attrs.pixiRenderer or "auto")
		renderer = undefined
		switch rendererType
			when "canvas"
				renderer = new PIXI.CanvasRenderer($element.width(), $element.height(), $element[0], transparent)
			when "webgl"
				try
					renderer = new PIXI.WebGLRenderer($element.width(), $element.height(), $element[0], transparent, antialias)
				catch e
					$scope.$emit "pixi.webgl.init.exception", e
			else
				renderer = PIXI.autoDetectRenderer($element.width(), $element.height(), $element[0], antialias, transparent)
		@render = render = (force) ->
			doRender = true
			doRender = renderFunc(stage, renderer)  if renderFunc
			renderer.render stage  if force or doRender isnt false

		requestAnimFrame renderLoop
		@getStage = ->
			stage

		@getRenderer = ->
			renderer

		@getContext = ->
			(if renderer.gl then renderer.gl else renderer.context)


# $($window).resize(function() {
#     renderer.resize(element.width(), element.height())
# })
