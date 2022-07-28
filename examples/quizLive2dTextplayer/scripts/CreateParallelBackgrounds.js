var CreateParallelBackgrounds = function(scene, x, y, SetKey, SetMaxIndex){
  var bgSet = [];
  for (let index = SetMaxIndex; index >= 0; index--) {
      var bg = scene.add.image(x, y, SetKey+index);
      bg.setScale(2);
      bg.setScrollFactor(1-0.1*index);
      //bg.setScale(scene.viewport.height/bg.height).setScrollFactor(1-0.1*index);
      bgSet.push(bg);
  }
  return bgSet;
}

export default CreateParallelBackgrounds;