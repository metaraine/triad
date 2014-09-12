angular.module("triad")
.controller "TriadAppCtrl", ($scope) ->

	# $scope.pixiRender = ()->
	# 	console.log 'render!'

	# console.log 'stage', $scope.stage
	$scope.stage = new PIXI.Stage(0x66ff99)

	$scope.pixiRender = (stage, renderer)->
		bunny.rotation += 0.1

	texture = PIXI.Texture.fromImage("/images/bunny.png")
	bunny = new PIXI.Sprite(texture)
	bunny.anchor.x = 0.5
	bunny.anchor.y = 0.5
	bunny.position.x = 100
	bunny.position.y = 100
	$scope.stage.addChild bunny
