angular.module('triad')

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

		# return the person
		person

