var CreateTouchArea = function(scene) {
  //建立透明觸控板
  scene.touchArea = scene.rexUI.add.overlapSizer({
      x: scene.viewport.centerX,
      y: scene.viewport.centerY,
      width: scene.viewport.width,
      height: scene.viewport.height,
  })
  .layout()
}

export default CreateTouchArea;