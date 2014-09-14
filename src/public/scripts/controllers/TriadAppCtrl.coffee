angular.module('triad')

# controls the main application
.controller 'TriadAppCtrl', ($scope, PIXI, TrianglePerson, $timeout, _) ->

	# render function called in the animation loop
	$scope.pixiRender = (stage, renderer)->

		# move each person and face them
		for person in people
			person.animate()

	$scope.stage = new PIXI.Stage 0x66ff99
	$scope.config =
		numPeople: 3
		personSize: 20
		velocity: 0.5

	people = []

	$timeout ->

		# create the people and add them to the stage
		people = for i in [1..$scope.config.numPeople]
			x = Math.random() * $scope.parentSize.width
			y = Math.random() * $scope.parentSize.height
			size = $scope.config.personSize
			person = new TrianglePerson x,y,size
			# person.vx = Math.random()*$scope.config.velocity - $scope.config.velocity/2
			# person.vy = Math.random()*$scope.config.velocity - $scope.config.velocity/2
			$scope.stage.addChild person
			person

		# have each person follow two random others
		for person in people

			notself = people.filter (p)->
				p isnt person

			person.targets = [
				_.sample(notself),
				_.sample(notself)
			]
