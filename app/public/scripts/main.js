(function() {
  var animate, bunny, renderer, stage, texture;

  console.log('test');

  animate = function() {
    requestAnimFrame(animate);
    bunny.rotation += 0.1;
    return renderer.render(stage);
  };

  stage = new PIXI.Stage(0x66ff99);

  renderer = new PIXI.WebGLRenderer(400, 300);

  document.body.appendChild(renderer.view);

  requestAnimFrame(animate);

  texture = PIXI.Texture.fromImage("/images/bunny.png");

  bunny = new PIXI.Sprite(texture);

  bunny.anchor.x = 0.5;

  bunny.anchor.y = 0.5;

  bunny.position.x = 200;

  bunny.position.y = 150;

  stage.addChild(bunny);

}).call(this);
