var CreateSpeechBubbleShape = function (scene, fillColor, strokeColor) {
  return scene.rexUI.add.customShapes({
      create: { lines: 1 },
      update: function () {
          var radius = 20;
          var indent = 15;

          var left = 0, right = this.width,
              top = 0, bottom = this.height, boxBottom = bottom - indent;
          this.getShapes()[0]
              .lineStyle(2, strokeColor, 1)
              .fillStyle(fillColor, 1)
              // top line, right arc
              .startAt(left + radius, top).lineTo(right - radius, top).arc(right - radius, top + radius, radius, 270, 360)
              // right line, bottom arc
              .lineTo(right, boxBottom - radius).arc(right - radius, boxBottom - radius, radius, 0, 90)
              // bottom indent                    
              .lineTo(left + 60, boxBottom).lineTo(left + 50, bottom).lineTo(left + 40, boxBottom)
              // bottom line, left arc
              .lineTo(left + radius, boxBottom).arc(left + radius, boxBottom - radius, radius, 90, 180)
              // left line, top arc
              .lineTo(left, top + radius).arc(left + radius, top + radius, radius, 180, 270)
              .close();

      }
  })
}

export default CreateSpeechBubbleShape;