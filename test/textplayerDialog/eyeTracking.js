var eyeTracking = function(scene){
  var pointer = scene.input.activePointer;
  var centerObject = scene.center; //CreateCameraCenter(scene)
  var touchArea = scene.touchArea; //CreateTouchArea(scene);
  var backX = scene.viewport.centerX;
  var backY = scene.viewport.centerY;

  var live2DCharacter = scene.textPlayer.character;//要在live2DCharacter與textplayer接起來之後才能執行這段

  if (pointer.isDown){
      centerObject.moveTo({x:pointer.worldX, y:pointer.worldY, ease: 'linear', speed: 300});
  } else {
      centerObject.moveTo({x:backX, y:backY, ease: 'linear', speed: 600});
      //scene.center.moveStop();
  } 

  if (touchArea.isInTouching){
      live2DCharacter.lookAt( pointer.worldX, pointer.worldY, {
          // camera: scene.cameras.main,
          // eyeBallX: 1, eyeBallY: 1,
          // angleX: 30, angleY: 30, angleZ: 30,
          // bodyAngleX: 10
      })
  } else {
      live2DCharacter.lookForward();
  }
}

export default eyeTracking;