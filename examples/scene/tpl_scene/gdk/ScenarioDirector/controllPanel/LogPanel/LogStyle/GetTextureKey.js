var ifKeyExist = function(scene, key){
  return scene.textures.exists(key);
}

var GetTextureKey = function(scene, id, expression){
  var out = '';
  var keyEXP = `por-${id}-${expression}`;
  var keyID = `por-${id}`;
  if (ifKeyExist(scene, keyEXP)){
    out = keyEXP;
  } else if (ifKeyExist(scene, keyID)){
    out = keyID;
  } else {
    out = 'ico_user';
  }
  return out;
}

export default GetTextureKey;