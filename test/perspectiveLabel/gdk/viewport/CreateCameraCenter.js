var CreateCameraCenter = function(scene) {
    //建立camera跟隨的center物件(使用sizer以便直接套用easeMove的功能)
    var center = scene.rexUI.add.label({
      x: scene.viewport.centerX,
      y: scene.viewport.centerY,
  }).layout()
  scene.cameras.main.startFollow(center, true, 0.5, 0.5);

  return center;
}

export default CreateCameraCenter;