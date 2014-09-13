angular.module('triad', [])

# wrap PIXI in a factory
.factory 'PIXI', -> PIXI

# A factory for a PersonGraphic function that returns a Graphics object
.factory 'PersonGraphic', ->
	(x, y, size, rotation)->
		person = new PIXI.Graphics()
		size = size or 20
		# person.drawCircle 100, 100, 20
		person.beginFill 0x6699ff
		person.moveTo 0,-size/2
		person.lineTo size/2, size/2
		person.lineTo -size/2, size/2
		person.lineTo 0, -size/2
		person.endFill()
		person.position.x = x or 0
		person.position.y = y or 0
		person.vx = 0
		person.vy = 0
		person.ax = 0
		person.ay = 0
		person.rotation = rotation or 0

		# move the person by their velocity
		person.animate = ()->
			@x += @vx
			@y += @vy
			@vx += @ax
			@vy += @ay

		# make the person face a given point
		person.face = (x,y)->
			@rotation = Math.atan((@position.y - y)/(@position.x - x)) - Math.PI/2
			# @rotation = Math.atan (@position.x - x)/(@position.y - y)
			# @rotation = Math.atan (y - @position.y)/(x - @position.y)
			# @rotation = Math.atan (x - @position.x)/(y - @position.y)

		# return the person
		person

# controls the main application
.controller 'TriadAppCtrl', ($scope, PIXI, PersonGraphic) ->

	# render function called in the animation loop
	$scope.pixiRender = (stage, renderer)->

		# move each person and face them
		for person in people
			person.animate()
			person.face(0,0)

	$scope.stage = new PIXI.Stage 0x66ff99

	# create 35 people and add them to the stage
	people = for i in [1..35]
		x = Math.random()*300
		y = Math.random()*150
		size = 20
		person = PersonGraphic x,y,size
		person.vx = Math.random()*0.5 - 0.25
		person.vy = Math.random()*0.5 - 0.25
		$scope.stage.addChild person
		person
