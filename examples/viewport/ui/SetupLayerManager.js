//這邊之後要補上DefaultData的layers設定

var SetupLayerManager = function(scene){
  var layerManager = scene.plugins.get('rexLayerManager').add(scene, [
    { name: 'bg' }, //沒給cameraName的layer都由scene.cameras.main控制畫面
    { name: 'go' },
    { name: 'ui', cameraName: 'ui' }, //需要鎖定或移動畫面的layer才用dedicated cam
]);
  return layerManager; 
}

export default SetupLayerManager;