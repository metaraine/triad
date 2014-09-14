angular.module('triad')

# A factory for a TrianglePerson constructor inherited from a pixi Graphics object
.factory 'TrianglePerson', ->

	class TrianglePerson extends PIXI.Graphics

		midpoint = (p1, p2)->
			x: (p1.x + p2.x)/2
			y: (p1.y + p2.y)/2

		constructor: (x, y, size, rotation)->
			super()
			@beginFill 0x6699ff
			@moveTo 0,-size/2
			@lineTo size/3, size/2
			@lineTo -size/3, size/2
			@lineTo 0, -size/2
			@endFill()
			@position.x = x or 0
			@position.y = y or 0
			@vx = 0
			@vy = 0
			# @ax = 0
			# @ay = 0
			@rotation = rotation or 0

		# move the person by their velocity
		animate: ()->
			@x += @vx
			@y += @vy
			# @vx += @ax
			# @vy += @ay

			# track targets
			if @targets and @targets.length is 2

				# find the midpoint of the targets to face
				mid = midpoint @targets[0], @targets[1]
				@face mid.x, mid.y

		# make the person face a given point
		face: (x,y)->
			@rotation = -Math.atan((@position.y - y)/(@position.x - x)) - Math.PI/2

	# return the TrianglePerson constructor
	TrianglePerson

