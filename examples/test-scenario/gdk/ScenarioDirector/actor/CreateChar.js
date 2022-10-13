var CreateChar = function(scene, charID, expressionName){
  var char = scene.add.rexTransitionImage(0, 0, 'char-' + charID + '-' + expressionName, 0, {
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
        char.transit({
          key: value, 
          frame: 0,
          duration: 1000,
        });
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
  var key = 'char-' + charID + '-' + charExpressionName;
  return key;
}

export default CreateChar;