var RightTailBubble = function () {
  var textLabel = this.scene.rexUI.getParentSizer(this);

  var fillColor = this.getData('fillColor');
  var strokeColor = this.getData('strokeColor');
  var radius = this.getData('bgRadius'); //20;
  var lineWidth = this.getData('lineWidth');
  var item = this.getData('item');

  var isHeader = item['logIsHeader'];
  var isSpeaker = false;
  if (item['logType'] == 'host' || item['logType'] == 'actor'){
    isSpeaker = true;
  }

  var tailWidth = 20; //尾巴寬度
  var tailHeight = 16; //尾巴高度

  var left = 0 + tailWidth, right = this.width - tailWidth,
      top = 0, bottom = this.height;
  var shape = this.getShapes()[0];
  shape
    .lineStyle(lineWidth, strokeColor, 1) //lineWidth, strokeColor, alpha
    .fillStyle(fillColor, 1) //fillColor, alpha
    // top line, right arc
    .startAt(left + radius.tl, top).lineTo(right - radius.tr, top).arc(right - radius.tr, top + radius.tr, radius.tr, 270, 360)
  if (isHeader && isSpeaker){
    shape
    .lineTo(right, bottom - 0.5*this.height - 0.5*tailHeight) //tail start
    .lineTo(right + tailWidth, bottom - 0.7*this.height) //tail center
    .lineTo(right, bottom - 0.5*this.height + 0.5*tailHeight) //tail end
  }
  shape
    .lineTo(right, bottom - radius.br).arc(right - radius.br, bottom - radius.br, radius.br, 0, 90)
    // bottom line, left arc
    .lineTo(left + radius.bl, bottom).arc(left + radius.bl, bottom - radius.bl, radius.bl, 90, 180)
    // left line, top arc
    .lineTo(left, top + radius.tl).arc(left + radius.tl, top + radius.tl, radius.tl, 180, 270)
    .close();
}

export default RightTailBubble;