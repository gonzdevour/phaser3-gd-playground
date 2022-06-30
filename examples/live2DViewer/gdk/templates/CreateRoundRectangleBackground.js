//建立寬高都只有1個圓角矩形讓sizer自動重設大小
var CreateRoundRectangleBackground = function (scene, radius, fillColor, strokeColor, strokeWidth) {
    if (radius === undefined) {
        radius = 0;
    }
    return scene.rexUI.add.roundRectangle(0, 0, 1, 1, radius, fillColor).setStrokeStyle(strokeWidth, strokeColor)
}

export default CreateRoundRectangleBackground;