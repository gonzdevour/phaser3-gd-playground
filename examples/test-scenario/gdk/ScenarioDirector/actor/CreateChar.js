var CreateChar = function(scene, charID, expressionName){
  var keyID = 'char-' + charID;
  var keyEXP = keyID + '-' + expressionName;
  if (ifKeyExist(scene, keyEXP)){ //使用帶表情的圖
    var newTextureKey = keyEXP;
  } else if (ifKeyExist(scene, keyID)){ //沒有表情就用ID圖
    var newTextureKey = keyID;
  } else {
    var newTextureKey = undefined; //沒圖就不transit
  }
  var char = scene.add.rexTransitionImage(0, 0, newTextureKey, 0, {
  })
  .setOrigin(0.5,1)
  .setData({
      charID:charID,
      charExpressionName:expressionName,
  })

  char.setData({
    charTextureKey: charGetTextureKey(char)
    })
    .on('changedata-charTextureKey', function(gameObject, value, previousValue){
      if (ifKeyExist(scene, value)) {
        char.transit({
          key: value, 
          frame: 0,
          duration: 1000,
        });
      } else {
        console.log('failed to transit char image. ' + value + ' does not exist.');
      }
    })

  char.setExpression = function(expressionName){
    var CurcharExpressionName = char.getData('charExpressionName');
    if (expressionName != CurcharExpressionName){
      char.setData({
        charExpressionName:expressionName,
      })
      char.setData('charTextureKey', charGetTextureKey(char))
    }
  }

  return char;
}

var charGetTextureKey = function(char){
  var charID = char.getData('charID');
  var charExpressionName = char.getData('charExpressionName');
  if (charExpressionName){
    var key = 'char-' + charID + '-' + charExpressionName;
  } else if (charID){
    var key = 'char-' + charID;
  } else {
    var key = undefined;
  }
  return key;
}

var ifKeyExist = function(scene, key){
  return scene.textures.exists(key);
}

export default CreateChar;