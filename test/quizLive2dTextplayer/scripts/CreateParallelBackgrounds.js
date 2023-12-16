var CreateParallelBackgrounds = function(scene, x, y, SetKey, SetMaxIndex){
  var rect = scene.add.image(x,y, 'rect').setDisplaySize(4200,2000);
  var mask = rect.createBitmapMask();
  var bgSet = [];
  for (let index = SetMaxIndex; index >= 0; index--) {
      var bg = scene.add.image(x, y, SetKey+index);
      if (index == 0){
        bg.setOrigin(0.5,0.5)
      } else {
        bg.setOrigin(0.4,0.6)
      }
      bg.setScale(2.2);
      bg.setScrollFactor(1-0.2*index);
      if (index == SetMaxIndex){
        scene.tweens.add({
          targets: bg,
          y: '-=500',
          yoyo: true,
          repeat: -1,
          duration: 5000,
        })
      }
      bg.setMask(mask);
      //bg.setScale(scene.viewport.height/bg.height).setScrollFactor(1-0.1*index);
      bgSet.push(bg);
  }
  return bgSet;
}

export default CreateParallelBackgrounds;