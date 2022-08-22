var CreateChar = function(scene, charID, expression, expressionIndex){
  if (expression == undefined){
    expression = 'normal';
  }
  if (expressionIndex == undefined){
    expressionIndex = '';
  }
  var char = scene.add.rexTransitionImage(512, 950, 'char-' + charID + '-' + expression + expressionIndex, 0, {
  })
  .setOrigin(0.5,1)
  .setData({
      charID:charID,
      charExpressionIndex:expressionIndex,
      charExpression:expression,
  })

  char.setData({
    charTextureKey: charGetTextureKey(char)
    })
    .on('changedata-charTextureKey', function(gameObject, value, previousValue){
        char.transit(value, 0);
    })

  char.setExpression = function(expressionName, expressionIndex){
    char.setData({
      charExpressionIndex:expressionIndex,
      charExpression:expressionName,
    })
    char.setData('charTextureKey', charGetTextureKey(char))
  }

  return char;
}

var charGetTextureKey = function(char){
  var charID = char.getData('charID');
  var charExpressionIndex = char.getData('charExpressionIndex');
  var charExpression = char.getData('charExpression');
  var key = 'char-' + charID + '-' + charExpression + charExpressionIndex;
  return key;
}

export default CreateChar;