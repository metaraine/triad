angular.module('triad')

# controls the main application
.controller 'TriadAppCtrl', ['$scope', 'PIXI', 'TrianglePerson', '$timeout', ($scope, PIXI, TrianglePerson, $timeout) ->

	# render function called in the animation loop
	$scope.pixiRender = (stage, renderer)->

		# move each person and face them
		for person in people
			person.animate()
			person.face(0,0)

	$scope.stage = new PIXI.Stage 0x66ff99
	$scope.config =
		numPeople: 35
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
			person.vx = Math.random()*$scope.config.velocity - $scope.config.velocity/2
			person.vy = Math.random()*$scope.config.velocity - $scope.config.velocity/2
			$scope.stage.addChild person
			person
]
