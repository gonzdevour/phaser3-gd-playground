//建立寬高都只有1個圓角矩形讓sizer自動重設大小
var CreateRoundRectangleBackground = function (scene, radius, fillColor, strokeColor, strokeWidth, fillColor2, isHorizontalGradient) {
    if (radius === undefined) {
        radius = 0;
    }
    //return scene.rexUI.add.roundRectangle(0, 0, 1, 1, radius, fillColor).setStrokeStyle(strokeWidth, strokeColor)
    return scene.rexUI.add.roundRectangleCanvas(0, 0, 1, 1, radius, fillColor, strokeColor, strokeWidth, fillColor2, isHorizontalGradient);
}

export default CreateRoundRectangleBackground;