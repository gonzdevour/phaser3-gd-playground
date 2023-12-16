var zoomFrom = function(scene, ratio, duration, ease, yoyo, repeat){
  var camera = scene.cameras.main;
  var zoom = scene.viewport.originalZoom?scene.viewport.originalZoom:1;
  scene.tweens.add({
      targets: camera,
      zoom: {from: ratio*zoom, to: zoom},
      duration: duration,
      ease: ease?ease:'cubic-easeIn',
      yoyo: typeof(yoyo)==='boolean'?yoyo:false,
      repeat: typeof(yoyo)==='number'?repeat:0,
  })
}

export default zoomFrom;