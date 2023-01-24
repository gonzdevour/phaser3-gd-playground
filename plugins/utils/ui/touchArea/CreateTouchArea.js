import AddEvent from "../../../../../phaser3-rex-notes/plugins/utils/gameobject/addevent/AddEvent";
import GetValue from "../../object/GetValue";

var CreateTouchArea = function(scene, extraConfig) {

  var instID = GetValue(extraConfig, 'instID', undefined);
  var owner = GetValue(extraConfig, 'owner', scene);
  var layerName = GetValue(extraConfig, 'layerName', 'bg');
  var viewport = GetValue(extraConfig, 'viewport', scene.viewport);
  var vpx = GetValue(extraConfig, 'vpx', 0.5);
  var vpy = GetValue(extraConfig, 'vpy', 0.5);

  //建立透明觸控板
  var touchArea = scene.rexUI.add.overlapSizer({
      x: viewport.centerX,
      y: viewport.centerY,
      width: viewport.width,
      height: viewport.height,
  })
  .layout()

  var scale = scene.scale;
  AddEvent(touchArea, scale, 'resize', function(pointer, localX, localY, event){
      touchArea
        .setMinSize(viewport.width, viewport.height)
        .layout()
  });

  scene.layerManager.addToLayer(layerName, touchArea);
  scene.vpc.add(touchArea, viewport, vpx, vpy);

  var destroyFunc = GetValue(owner, 'destroy', undefined);
  if (destroyFunc){
    owner.on('destroy', function() {
      touchArea.destroy()
    })
  }

  touchArea.onClick(function(){
    console.log(`[touchArea]${instID} is clicked`)
  })

  touchArea.instID = instID;

  return touchArea;
}

export default CreateTouchArea;