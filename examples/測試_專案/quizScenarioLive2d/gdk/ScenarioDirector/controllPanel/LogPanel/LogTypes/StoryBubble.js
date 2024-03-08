var StoryBubble = function () {
  var fillColor = 0x111111;
  var strokeColor = 0x333333;
  var radius = { tl: 5, tr: 5, bl: 5, br: 5 };
  var lineWidth = this.getData('lineWidth');
  var item = this.getData('item');

  var left = 0, right = this.width,
      top = 0, bottom = this.height;
  
  var shape = this.getShapes()[0];
  shape
    .lineStyle(lineWidth, strokeColor, 1) //lineWidth, strokeColor, alpha
    .fillStyle(fillColor, 1) //fillColor, alpha
    // top line, right arc
    .startAt(left + radius.tl, top).lineTo(right - radius.tr, top).arc(right - radius.tr, top + radius.tr, radius.tr, 270, 360)
    // right line, bottom arc
    .lineTo(right, bottom - radius.br).arc(right - radius.br, bottom - radius.br, radius.br, 0, 90)
    // bottom line, left arc
    .lineTo(left + radius.bl, bottom).arc(left + radius.bl, bottom - radius.bl, radius.bl, 90, 180)
    //left line, top arc
    .lineTo(left, top + radius.tl).arc(left + radius.tl, top + radius.tl, radius.tl, 180, 270)
    .close();
}

export default StoryBubble;