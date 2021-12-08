var CreateRoundRectangleBackground = function (scene, radius, fillColor, strokeColor, strokeWidth) {
    if (radius === undefined) {
        radius = 0;
    }
    return scene.rexUI.add.roundRectangle(0, 0, 1, 1, radius, fillColor).setStrokeStyle(strokeWidth, strokeColor)
}

export default CreateRoundRectangleBackground;