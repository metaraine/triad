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
		personSize: 20
		numPeople: 4
		velocity: 2

	people = []

	$timeout ->

		# create the people and add them to the stage
		people = for i in [1..$scope.config.numPeople]
			x = Math.random() * $scope.parentSize.width
			y = Math.random() * $scope.parentSize.height
			size = $scope.config.personSize
			person = new TrianglePerson x,y,size
			person.velocity = $scope.config.velocity
			$scope.stage.addChild person
			person

		# have each person follow two random others
		for person in people

			notSelf = people.filter (p)-> p isnt person
			firstTarget = _.sample(notSelf)
			notSelfOrFirst = notSelf.filter (p)-> p isnt firstTarget
			secondTarget = _.sample(notSelfOrFirst)

			person.targets = [firstTarget, secondTarget]

			person.draw()
