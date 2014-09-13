angular.module("triad")

.directive "pixi", ['$parse', ($parse)->

	# template: '<canvas></canvas>',
	restrict: "A"
	scope: false
	controller: postLink = ['$scope', '$element', '$attrs', '$window', '$timeout', 'PIXI', ($scope, $element, $attrs, $window, $timeout, PIXI)->
		self = this
		renderer = null

		@start = ->
			renderLoop = ->
				self.render()
				requestAnimFrame renderLoop

			@setRenderer()
			@resize()
			requestAnimFrame renderLoop

		@setRenderer = ->
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

		@render = (force)->
			renderFunc(stage, renderer)
			renderer.render stage

		@getStage = ->
			stage

		@getRenderer = ->
			renderer

		@getContext = ->
			(if renderer.gl then renderer.gl else renderer.context)

		@resize = ->
			renderer.resize $element[0].width, $element[0].height

		stageAttr = $parse($attrs.pixi)
		stage = stageAttr($scope)
		renderFunc = $scope.$eval($attrs.pixiRender)

		antialias = $scope.$eval($attrs.pixiAntialias or "false")
		transparent = $scope.$eval($attrs.pixiTransparent or "false")
		rendererType = $scope.$eval($attrs.pixiRenderer or "auto")

		if not stage
			stage = new PIXI.Stage($scope.$eval($attrs.pixiBackground or "0"))
			stageAttr.assign $scope, stage

		w = angular.element($window)
		w.bind 'resize', @resize

		$timeout @start.bind(@)
	]
]
