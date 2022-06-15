//utils
import GetValue from "../utils/object/GetValue";

var ninja = function (gameObject, config) {

  var alphaOver = GetValue(config, 'alphaOver', 0.6);
  var alphaOut = GetValue(config, 'alphaOut', 1);

  //給予button共通的over/out反應
  gameObject.on('pointerover',function(pointer, localX, localY, event){
    gameObject.setAlpha(alphaOver);
  });

  gameObject.on('pointerout',function(pointer, event){
    gameObject.setAlpha(alphaOut);
  });

  return gameObject;
}

export default ninja;