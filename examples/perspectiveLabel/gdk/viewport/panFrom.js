var panFrom = function(scene, xPlus, yPlus, duration, ease, yoyo, repeat){
  var camera = scene.cameras.main;
  scene.tweens.add({
      targets: camera,
      x: {from: xPlus+camera.x, to: camera.x},
      y: {from: yPlus+camera.y, to: camera.y},
      duration: duration,
      ease: ease?ease:'cubic-easeIn',
      yoyo: typeof(yoyo)==='boolean'?yoyo:false,
      repeat: typeof(yoyo)==='number'?repeat:0,
  })
}

export default panFrom;