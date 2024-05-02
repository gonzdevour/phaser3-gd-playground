//utils
import GetValue from "gdkPlugins/utils/object/GetValue";
import AddEvent from 'rexnotePlugins/utils/gameobject/addevent/AddEvent';

var ninja = function (gameObject, config) {

  var alphaOver = GetValue(config, 'alphaOver', 0.6);
  var alphaOut = GetValue(config, 'alphaOut', 1);

  //給予button共通的over/out反應
  AddEvent(gameObject, gameObject, 'pointerover', function(pointer, localX, localY, event){
    gameObject.setAlpha(alphaOver);
  });

  AddEvent(gameObject, gameObject, 'pointerout', function(pointer, localX, localY, event){
    gameObject.setAlpha(alphaOut);
  });

  return gameObject;
}

export default ninja;