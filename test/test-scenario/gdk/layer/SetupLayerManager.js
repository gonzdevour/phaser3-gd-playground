import { DefaultAppConfig } from "../../settings/DefaultData";

var SetupLayerManager = function(scene){
  var layerManager = scene.plugins.get('rexLayerManager').add(scene, DefaultAppConfig.layers);
  return layerManager; 
}

export default SetupLayerManager;