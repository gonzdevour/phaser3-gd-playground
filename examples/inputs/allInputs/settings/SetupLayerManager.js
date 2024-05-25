//這邊之後要補上DefaultData的layers設定

var SetupLayerManager = function(scene){
  var layerManager = scene.plugins.get('rexLayerManager').add(scene, [
    { name: 'clickArea' },
    { name: 'bg', scrollFactor:0.5 }, //沒給cameraName的layer都由scene.cameras.main控制畫面，支援zoom
    { name: 'main', scrollFactor:1 },
    { name: 'ui', cameraName:'ui' }, //scrollFactor:0時依然會受到zoom的影響，所以ui需要dedicated cam而不能跟main放在一起
  ]);
  return layerManager; 
}

export default SetupLayerManager;