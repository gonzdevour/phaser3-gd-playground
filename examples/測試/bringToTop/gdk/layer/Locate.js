import GetValue from "gdkPlugins/utils/object/GetValue";

var Locate = function(scene, target, config){

  var instID = GetValue(config, 'instID', undefined);
  if (target.instID == undefined){
    target.instID = instID;
  }

  var layerName = GetValue(config, 'layerName', 'main');
  var viewport = GetValue(config, 'viewport', scene.viewport);
  var vpx = GetValue(config, 'vpx', 0.5);
  var vpy = GetValue(config, 'vpy', 0.5);
  var vpxOffset = GetValue(config, 'vpxOffset', 0);
  var vpyOffset = GetValue(config, 'vpyOffset', 0);

  scene.layerManager.addToLayer(layerName, target);
  scene.vpc.add(target, viewport, vpx, vpy);
  target.vpxOffset = vpxOffset;
  target.vpyOffset = vpyOffset;

  return target; 
}

export default Locate;