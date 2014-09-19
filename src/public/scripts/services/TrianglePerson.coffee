angular.module('triad')

# A factory for a TrianglePerson constructor inherited from a pixi Graphics object
.factory 'TrianglePerson', ->

	class TrianglePerson extends PIXI.Graphics

		midpoint = (p1, p2)->
			x: (p1.x + p2.x)/2
			y: (p1.y + p2.y)/2

		# vectorProjection = (a, b, c) ->

		# 	dx = b.x - a.x
		# 	dy = b.y - a.y

		# 	k = (dy * (c.x - a.x) - dx * (c.y - a.y)) /
		# 		(Math.pow(dy, 2) + Math.pow(dx, 2))

		# 	x: c.x - k * dy
		# 	y: c.y - k * dx

		# get the two possible vertices for an equilateral triangle between the given two points
		vertices = (a, b)->
			dx = a.x - b.x
			dy = a.y - b.y

			# sine and cosine of 60 degrees
			s60 = Math.sin(Math.PI/3)
			c60 = Math.cos(Math.PI/3)

			# negative sine and cosine of 60 degrees
			ns60 = Math.sin(-Math.PI/3)
			nc60 = Math.cos(-Math.PI/3)

			[
				{
					x: c60*dx - s60*dy + b.x
					y: s60*dx + c60*dy + b.y
				}
				{
					x: nc60*dx - ns60*dy + b.x
					y: ns60*dx + nc60*dy + b.y
				}
			]

		constructor: (x, y, size, rotation)->
			super()
			@size = size
			@x = x or 0
			@y = y or 0
			@vx = 0
			@vy = 0
			# @ax = 0
			# @ay = 0
			@rotation = rotation or 0

		draw: ()->
			@beginFill 0x6699ff
			@moveTo 0, -@size/3
			@lineTo @size, 0
			@lineTo 0, @size/3
			@lineTo 0, -@size/3
			@endFill()

			# @drawTarget()

		# drawTarget: ()->
		# 	# draw lines to targets
		# 	@lineStyle 1, 0
		# 	@moveTo 0, 0
		# 	@lineTo 500, 0

		# move the person by their velocity
		animate: ()->
			# @x += @vx
			# @y += @vy
			# @vx += @ax
			# @vy += @ay

			# track targets
			if @targets and @targets.length is 2

				# find the midpoint of the targets to face
				mid = midpoint @targets[0], @targets[1]
				@face mid.x, mid.y

				# get the two possible vertices for an equilateral triangle
				verts = vertices @targets[0], @targets[1]

				# find the vertex that is closest
				roughDistances = verts.map @roughDistance.bind(this)
				closestDistance = Math.min.apply null, roughDistances
				targetVertex = verts[roughDistances.indexOf(closestDistance)]

				# get the angle between the person and the target vertex
				moveAngle = -Math.atan2 targetVertex.y - @y, targetVertex.x - @x

				# move towards the target vertex
				dx = @velocity * Math.cos(moveAngle)
				dy = -@velocity * Math.sin(moveAngle) #inverse y because of screen coordinates

				# don't move any closer once closestDistance has been passed
				if Math.sqrt(closestDistance) > 2*@velocity
					@x += dx
					@y += dy

				# console.log @x, @y, targetVertex, moveAngle, moveAngle * 180/Math.PI, dx, dy

		# make the person face a given point
		face: (x,y)->
			# y difference must be inversed since y axis is inverse of normal cartesian coordinates
			# angle must be inversed since pixi rotation is clockwise
			@rotation = -Math.atan2 @y - y, x - @x
			# @rotation = -Math.PI/3

		roughDistance: (p)->
			Math.pow(p.x - @x, 2) + Math.pow(p.y - @y, 2)

	# return the TrianglePerson constructor
	TrianglePerson

#
