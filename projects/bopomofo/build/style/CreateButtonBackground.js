var CreateButtonBackground = function (scene, radius, fillColor, strokeColor, strokeWidth) {
    if (radius === undefined) {
        radius = 0;
    }
    return scene.rexUI.add.customShapes({
        create: [
            { name: 'body', type: 'lines' },
            { name: 'left', type: 'lines' },
            { name: 'right', type: 'lines' },
        ],

        update: function () {
            /*
            xStart - x1 ---- x2 - xEnd
            yStart - y1 ---- y2 - yEnd
            */
            var xStart = strokeWidth + 4,
                yStart = strokeWidth + 4;
            var x1 = xStart + radius,
                y1 = yStart + radius;
            var xEnd = this.width - (xStart * 2),
                yEnd = this.height - (yStart * 2);
            var x2 = xEnd - radius,
                y2 = yEnd - radius;

            this.getShape('body')
                .fillStyle(this.fillColor, this.fillAlpha)
                .lineStyle(strokeWidth, this.strokeColor, 1)
                .startAt(x1, yStart)
                .lineTo(x2, yStart)
                .arc(x2, y1, radius, 270, 360, false)
                .lineTo(xEnd, y2)
                .arc(x2, y2, radius, 0, 90, false)
                .lineTo(x1, yEnd)
                .arc(x1, y2, radius, 90, 180, false)
                .lineTo(xStart, y1)
                .arc(x1, y1, radius, 180, 270, false)
                .close()

            this.getShape('left')
                .lineStyle(strokeWidth + 8, this.strokeColor, 1)
                .startAt(xStart, y2 - 20)
                .lineTo(xStart, y2)
                .arc(x1, y2, radius, 180, 90, true)
                .lineTo(x1 + 20, yEnd)
                .end()

            this.getShape('right')
                .lineStyle(strokeWidth + 8, this.strokeColor, 1)
                .startAt(x2 - 20, yStart)
                .lineTo(x2, yStart)
                .arc(x2, y1, radius, 270, 360, false)
                .lineTo(xEnd, y1 + 20)
                .end()
        },
    })
        .setFillStyle(fillColor)
        .setStrokeStyle(strokeWidth, strokeColor)

}

export default CreateButtonBackground;