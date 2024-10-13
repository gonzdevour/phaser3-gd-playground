var CameraWheelZoom = function(scene){
  var camMain = scene.cameras.main

  //wheel
  camMain.zoomRatio = 1;
  camMain.enableWheelZoom = true;
  scene.input.on('wheel', function(pointer, currentlyOver, dx, dy, dz, event){
      //滾輪向上dy為負值，向下dy為正值
      //console.log(`--dx:${dx},dy:${dy},dz:${dz}, `);
      //向上減，向下加
      var camMain = scene.cameras.main;
      if (camMain.enableWheelZoom == true){
        camMain.zoomRatio = Phaser.Math.Clamp(camMain.zoomRatio + 0.1*Math.sign(dy), 0.1, 2)
        scene.tweens.add({
            targets: camMain,
            zoom: camMain.zoomRatio,
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: 0,            // -1: infinity
            yoyo: false,
        });
      }
  },scene)

}

export default CameraWheelZoom;