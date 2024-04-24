var CreatePortait = function(scene, id, expressionName){

  var textureKey = 'por-' + id + '-' + expressionName;
  var tImage = scene.rexUI.add.transitionImage(0, 0, textureKey, 0, {
  })
  .setOrigin(0.5,0.5)
  .setData({ //存入textureKey以偵測transit時是否相同
      id: id,
      expressionName: expressionName,
      textureKey: textureKey,
  })
  .on('changedata-textureKey', function(gameObject, value, previousValue){
    if (ifKeyExist(scene, value)) {
      tImage.transit(value, 0);
    } else {
      console.log('failed to transit portrait. ' + value + ' does not exist.');
    }
  })

  //提供setExpression函數給外部呼叫
  tImage.setPortrait = function(id, expressionName){
    var keyID = 'por-' + id;
    var keyEXP = keyID +  '-' + expressionName;
    if (ifKeyExist(scene, keyEXP)){ //使用帶表情的圖
      var newTextureKey = keyEXP;
    } else if (ifKeyExist(scene, keyID)){ //沒有表情就用ID圖
      var newTextureKey = keyID;
    } else {
      var newTextureKey = undefined; //沒圖就不transit
    }
    if (newTextureKey){
      var curID = tImage.getData('id');
      var curTextureKey = tImage.getData('textureKey');
      if(id != curID){
        tImage.setDuration(0);
      } else {
        tImage.setDuration(500);
      }
      if (newTextureKey != curTextureKey){ //如果不是原本的圖樣才呼叫transit
        tImage.setData({
          id: id,
          expressionName: expressionName,
          textureKey:newTextureKey, //觸發transit
        })
      }
    }
    return tImage;
  }

  return tImage;
}

var ifKeyExist = function(scene, key){
  return scene.textures.exists(key);
}

export default CreatePortait;