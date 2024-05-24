import OnWindowResize from "gdkPlugins/utils/rwd/OnWindowResize";

var SetupViewport = function(scene, testMode){
  var viewport = new Phaser.Geom.Rectangle(0, 0, 0, 0);

  if (testMode){
    scene.vpRect = scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10).setStrokeStyle(10, 0xff0000).setOrigin(0,0); //顯示方框(測試用)
    if (scene.layerManager.has("ui")){
      scene.layerManager.addToLayer('ui', scene.vpRect); //如果有ui layer的話，將vpRect加入ui layer
    }
  }

  var camToCenterOn = scene.cameras.main//scene.cameras.getCamera(camToCenterOn_name)
  var UpdateViewport = (function(gameSize, baseSize, displaySize, previousWidth, previousHeight) {
      var newviewport = scene.scale.getViewPort();
      viewport.setTo(0,0,newviewport.width, newviewport.height);
      scene.vpRect.setSize(viewport.width, viewport.height)

      if (camToCenterOn){
        var prevCenterX = camToCenterOn.scrollX + (previousWidth / 2)
        var prevCenterY = camToCenterOn.scrollY + (previousHeight / 2)
        camToCenterOn.centerOn(prevCenterX,prevCenterY)
      }

  }).bind(scene);

  OnWindowResize(scene, UpdateViewport, this);
  UpdateViewport(undefined, undefined, undefined, scene.scale.getViewPort().width, scene.scale.getViewPort().height);
  //scene.scale.refresh();

  return viewport;
}

export default SetupViewport;