console.log 'test'

animate = ->
  requestAnimFrame animate

  # just for fun, lets rotate mr rabbit a little
  bunny.rotation += 0.1

  # render the stage
  renderer.render stage

stage = new PIXI.Stage(0x66ff99)
renderer = new PIXI.WebGLRenderer(400, 300)
document.body.appendChild renderer.view
requestAnimFrame animate
texture = PIXI.Texture.fromImage("/images/bunny.png")
bunny = new PIXI.Sprite(texture)
bunny.anchor.x = 0.5
bunny.anchor.y = 0.5
bunny.position.x = 200
bunny.position.y = 150
stage.addChild bunny
