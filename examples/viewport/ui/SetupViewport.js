import OnWindowResize from "gdkPlugins/utils/rwd/OnWindowResize";

var SetupViewport = function(scene, testMode){
    var viewport = new Phaser.Geom.Rectangle(0, 0, 0, 0);

    if (testMode){
      scene.vpRect = scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10).setStrokeStyle(10, 0xff0000).setOrigin(0,0); //顯示方框(測試用)
      var camUI = scene.cameras.getCamera("ui")
      if (camUI){
        scene.layerManager.addToLayer('ui', scene.vpRect); //如果有ui layer的話，將vpRect加入ui layer
      }
    }

    var camToCenterOn = scene.cameras.main//scene.cameras.getCamera(camToCenterOn_name)
    if (camToCenterOn){ //camToCenterOn: 指定的cam會記錄resize前的畫面中心點，再resize後重新centerOn回中心點。這通常是一個會位移的cam
      camToCenterOn.centerXprev = scene.scale.getViewPort().centerX; //(centerXprev, centerYprev)是scale.onResize前的畫面中心點
      camToCenterOn.centerYprev = scene.scale.getViewPort().centerY; //camToCenterOn.worldView.centerX
      //console.log(`${camToCenterOn.centerXprev},${camToCenterOn.centerYprev}`)
    }

    var UpdateViewport = (function(gameSize, baseSize, displaySize, previousWidth, previousHeight) {
        var newviewport = scene.scale.getViewPort();
        viewport.setTo(0,0,newviewport.width, newviewport.height);
        scene.vpRect.setSize(viewport.width, viewport.height)
        if (camToCenterOn){
          camToCenterOn.centerOn(camToCenterOn.centerXprev,camToCenterOn.centerYprev)
          console.log(`${camToCenterOn.centerX},${camToCenterOn.centerY}`)
        }
    }).bind(scene);

  OnWindowResize(scene, UpdateViewport, this);
  UpdateViewport();
  //scene.scale.refresh();

  return viewport;
}

export default SetupViewport;