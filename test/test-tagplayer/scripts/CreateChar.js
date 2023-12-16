var CreateChar = function(scene){
  var char = scene.add.rexTransitionImage(512, 950, 'test-normal0', 0, {
  })
  .setOrigin(0.5,1)
  .setData({
      charName:'test',
      charExpressionIndex:0,
      charExpression:'normal',
  })

  char.setData({
    charTextureKey: charGetTextureKey(char)
    })
    .on('changedata-charTextureKey', function(gameObject, value, previousValue){
        char.transit(value, 0);
    })

  scene.input.on('pointerup',function(pointer){
    if ( char.getData('charExpression') == 'normal'){
        char.setData({
            charExpressionIndex:0,
            charExpression:'angry',
        })
        char.setData('charTextureKey', charGetTextureKey(char))
    } else {
        char.setData({
            charExpressionIndex:0,
            charExpression:'normal',
        })
        char.setData('charTextureKey', charGetTextureKey(char))
    }
  },scene)

  return char;
}

var charGetTextureKey = function(char){
  var charName = char.getData('charName');
  var charExpressionIndex = char.getData('charExpressionIndex');
  var charExpression = char.getData('charExpression');
  var key = charName + '-' + charExpression + charExpressionIndex;
  return key;
}

export default CreateChar;