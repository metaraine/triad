(function() {
  angular.module('triad').controller('TriadAppCtrl', function($scope, PIXI, TrianglePerson, $timeout) {
    var people;
    $scope.pixiRender = function(stage, renderer) {
      var person, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = people.length; _i < _len; _i++) {
        person = people[_i];
        person.animate();
        _results.push(person.face(0, 0));
      }
      return _results;
    };
    $scope.stage = new PIXI.Stage(0x66ff99);
    $scope.config = {
      numPeople: 35,
      personSize: 20,
      velocity: 0.5
    };
    people = [];
    return $timeout(function() {
      var i, person, size, x, y;
      return people = (function() {
        var _i, _ref, _results;
        _results = [];
        for (i = _i = 1, _ref = $scope.config.numPeople; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
          x = Math.random() * $scope.parentSize.width;
          y = Math.random() * $scope.parentSize.height;
          size = $scope.config.personSize;
          person = new TrianglePerson(x, y, size);
          person.vx = Math.random() * $scope.config.velocity - $scope.config.velocity / 2;
          person.vy = Math.random() * $scope.config.velocity - $scope.config.velocity / 2;
          $scope.stage.addChild(person);
          _results.push(person);
        }
        return _results;
      })();
    });
  });

}).call(this);
