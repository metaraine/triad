angular.module("triad")

.directive "pixi", ($parse)->

	# template: '<canvas></canvas>',
	restrict: "A"
	scope: false
	controller: postLink = ($scope, $element, $attrs)->
		self = this

		renderLoop = ->
			self.render()
			requestAnimFrame renderLoop

		stageAttr = $parse($attrs.pixi)
		stage = stageAttr($scope)
		renderFunc = $scope.$eval($attrs.pixiRender)

		if not stage
			console.log 'new stage'
			stage = new PIXI.Stage($scope.$eval($attrs.pixiBackground or "0"))
			stageAttr.assign $scope, stage
		antialias = $scope.$eval($attrs.pixiAntialias or "false")
		transparent = $scope.$eval($attrs.pixiTransparent or "false")
		rendererType = $scope.$eval($attrs.pixiRenderer or "auto")

		switch rendererType
			when "canvas"
				# Had to change $element.width(), becuase it was undefined, to $element[0].width ??? Documented but not defined?
				renderer = new PIXI.CanvasRenderer($element[0].width, $element[0].height, $element[0], transparent)
			when "webgl"
				# try
				renderer = new PIXI.WebGLRenderer($element[0].width, $element[0].height, $element[0], transparent, antialias)
				# catch e
				# 	$scope.$emit "pixi.webgl.init.exception", e
				# 	console.error "pixi.webgl.init.exception", e
			else
				renderer = PIXI.autoDetectRenderer($element[0].width, $element[0].height, $element[0], antialias, transparent)

		@render = render = (force)->
			renderFunc(stage, renderer)
			renderer.render stage

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
