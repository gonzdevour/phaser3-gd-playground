const COLOR_PRIMARY = 0x000000; //'#4e342e'
const COLOR_LIGHT = 0xffffff; //'#00ff00'

var CreateTextbox = function (scene, wrapWidth, width, height) {
    if (width === undefined) {
        width = 0;
    }
    if (height === undefined) {
        height = 0;
    }
    var textBox = scene.rexUI.add.textBox({
        background: CreateSpeechBubbleShape(scene).setFillStyle(COLOR_PRIMARY, 1).setStrokeStyle(3, COLOR_LIGHT, 1),
        //icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),
        text: CreateBuiltInText(scene, 400, width, height),
        //action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),
        space: { left: 20, right: 20, top: 20, bottom: 60, icon: 20, text: 20,}
    }).setOrigin(0, 1).layout();

    textBox
        .setInteractive()
        .on('pointerdown', function () {
            var icon = this.getElement('action').setVisible(false);
            this.resetChildVisibleState(icon);
            if (this.isTyping) {
                this.stop(true);
            } else {
                this.typeNextPage();
            }
        }, textBox)
        .on('pageend', function () {
            if (this.isLastPage) {
                return;
            }
            var icon = this.getElement('action').setVisible(true);
            this.resetChildVisibleState(icon);
            icon.y -= 30;
            var tween = scene.tweens.add({targets: icon, y: '+=30', ease: 'Bounce', duration: 500,});
        }, textBox)
    //.on('type', function () {
    //})

    return textBox;
}

var CreateBuiltInText = function (scene, wrapWidth, width, height) {
    return scene.rexUI.add.BBCodeText(0, 0, '', {
        fontSize: '36px',
        lineSpacing: 10,
        wrap: {
            mode: 'character',
            width: wrapWidth
        },
        //maxLines: 3
    })
        .setFixedSize(width, height);
}

var CreateSpeechBubbleShape = function (scene) {
    return scene.rexUI.add.customShapes({
        create: { lines: 1 },
        update: function () {
            var radius = 20;
            var indent = 30;

            var left = 0, right = this.width,
                top = 0, bottom = this.height, boxBottom = bottom - indent;
            this.getShapes()[0]
                .lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)
                .fillStyle(this.fillColor, this.fillAlpha)
                // top line, right arc
                .startAt(left + radius, top).lineTo(right - radius, top).arc(right - radius, top + radius, radius, 270, 360)
                // right line, bottom arc
                .lineTo(right, boxBottom - radius).arc(right - radius, boxBottom - radius, radius, 0, 90)
                // bottom indent                    
                .lineTo(left + 160, boxBottom).lineTo(left + 170, bottom).lineTo(left + 120, boxBottom)
                // bottom line, left arc
                .lineTo(left + radius, boxBottom).arc(left + radius, boxBottom - radius, radius, 90, 180)
                // left line, top arc
                .lineTo(left, top + radius).arc(left + radius, top + radius, radius, 180, 270)
                .close();
        }
    })
}

export default CreateTextbox;