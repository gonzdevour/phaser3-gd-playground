var CreateChar = function(scene, charID, expressionName, expressionIndex){
  if (expressionName == undefined){
    expressionName = 'normal';
  }
  if (expressionIndex == undefined){
    expressionIndex = '';
  }
  var char = scene.add.rexTransitionImage(0, 0, 'char-' + charID + '-' + expressionName + expressionIndex, 0, {
  })
  .setOrigin(0.5,1)
  .setData({
      charID:charID,
      charExpressionIndex:expressionIndex,
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

  char.setExpression = function(expressionName, expressionIndex){
    if (expressionName == undefined){
      expressionName = 'normal';
    }
    if (expressionIndex == undefined){
      expressionIndex = '';
    }
    var CurcharExpressionIndex = char.getData('charExpressionIndex');
    var CurcharExpressionName = char.getData('charExpressionName');
    var IsTheSame = expressionName == CurcharExpressionName && expressionIndex == CurcharExpressionIndex
    if (!IsTheSame){
      char.setData({
        charExpressionIndex:expressionIndex,
        charExpression:expressionName,
      })
      char.setData('charTextureKey', charGetTextureKey(char))
    }
  }

  return char;
}

var charGetTextureKey = function(char){
  var charID = char.getData('charID');
  var charExpressionIndex = char.getData('charExpressionIndex');
  var charExpressionName = char.getData('charExpressionName');
  var key = 'char-' + charID + '-' + charExpressionName + charExpressionIndex;
  return key;
}

export default CreateChar;