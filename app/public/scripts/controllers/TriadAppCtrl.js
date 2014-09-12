(function() {
  angular.module("triad").controller("TriadAppCtrl", function($scope) {
    var bunny, texture;
    $scope.stage = new PIXI.Stage(0x66ff99);
    $scope.pixiRender = function(stage, renderer) {
      return bunny.rotation += 0.1;
    };
    texture = PIXI.Texture.fromImage("/images/bunny.png");
    bunny = new PIXI.Sprite(texture);
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;
    bunny.position.x = 100;
    bunny.position.y = 100;
    return $scope.stage.addChild(bunny);
  });

}).call(this);
