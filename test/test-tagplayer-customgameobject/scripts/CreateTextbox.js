const COLOR_PRIMARY = 0x000000; //'#4e342e'
const COLOR_LIGHT = 0xffffff; //'#00ff00'

var CreateTextbox = function (scene, speaker, width, height) {
    if (width === undefined) {
        width = 0;
    }
    if (height === undefined) {
        height = 0;
    }
    var textBox = scene.rexUI.add.textBox({
        background: CreateSpeechBubbleShape(scene, speaker).setFillStyle(COLOR_PRIMARY, 1).setStrokeStyle(3, COLOR_LIGHT, 1),
        //icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),
        text: CreateBuiltInText(scene, 400, width, height),
        //action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),
        space: { left: 20, right: 20, top: 20, bottom: 60, icon: 20, text: 20,}
    }).setOrigin(0.5, 1).layout();




    textBox
        .setInteractive()
        .on('type', function () {
            if(speaker){
                var centerX = speaker.stageCenter?speaker.stageCenter:512;
                if(speaker.x > centerX){
                    this.setOrigin(0.6, 1);
                }else if(speaker.x < centerX){
                    this.setOrigin(0.4, 1)
                }
                var bg = this.getElement('background');
                bg.tailOriginX = this.originX;
            }
        }, textBox)
        .on('pointerdown', function () {
            // var icon = this.getElement('action').setVisible(false);
            // this.resetChildVisibleState(icon);
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

            // var icon = this.getElement('action').setVisible(true);
            // this.resetChildVisibleState(icon);
            // icon.y -= 30;
            // var tween = scene.tweens.add({
            //     targets: icon,
            //     y: '+=30', // '+=100'
            //     ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            //     duration: 500,
            //     repeat: 0, // -1: infinity
            //     yoyo: false
            // });
        }, textBox)
    //.on('type', function () {
    //})

    return textBox;
}

var CreateBuiltInText = function (scene, wrapWidth, width, height) {
    return scene.rexUI.add.BBCodeText(0, 0, '', {
        fontSize: '64px',
        lineSpacing: 10,
        wrap: {
            mode: 'character',
            width: wrapWidth
        },
        //maxLines: 3
    })
        .setSize(width, height);
}

// var CreateBuiltInText = function (scene, wrapWidth, width, height) {
//     return scene.add.text(0, 0, '', {
//         fontSize: '36px',
//         wordWrap: {
//             width: wrapWidth
//         },
//         maxLines: 3
//     })
//         .setFixedSize(width, height);
// }

var CreateSpeechBubbleShape = function (scene, speaker) {
    var shape = scene.rexUI.add.customShapes({
        create: { lines: 1 },
        update: function () {
            var radius = 20;
            var tailHeight = 30;
            var tailWidth = 40;

            var left = 0, right = this.width,
                top = 0, bottom = this.height, boxBottom = bottom - tailHeight,
                //沒有指定speaker的時候尾巴置中
                tailCenterX = this.tailOriginX*this.width,
                indentRight = left + tailCenterX+0.5*tailWidth,
                indentBottom = left + tailCenterX,
                indentLeft = left + tailCenterX-0.5*tailWidth;

            if(speaker){
                var centerX = speaker.stageCenter?speaker.stageCenter:512;
                if(speaker.x > centerX){
                    //speaker在舞台右方，尾巴朝左
                    indentRight = left + tailCenterX+0.5*tailWidth,
                    indentBottom = left + tailCenterX+0.5*tailWidth+10;
                    indentLeft = left + tailCenterX-0.5*tailWidth;
                }else if(speaker.x < centerX){
                    //speaker在舞台左方，尾巴朝右
                    indentRight = left + tailCenterX+0.5*tailWidth,
                    indentBottom = left + tailCenterX-0.5*tailWidth-10;
                    indentLeft = left + tailCenterX-0.5*tailWidth;
                }
            }

            this.getShapes()[0]
                .lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)
                .fillStyle(this.fillColor, this.fillAlpha)
                // top line, right arc
                .startAt(left + radius, top).lineTo(right - radius, top).arc(right - radius, top + radius, radius, 270, 360)
                // right line, bottom arc
                .lineTo(right, boxBottom - radius).arc(right - radius, boxBottom - radius, radius, 0, 90)
                // bottom indent                    
                .lineTo(indentRight, boxBottom).lineTo(indentBottom, bottom).lineTo(indentLeft, boxBottom)
                // bottom line, left arc
                .lineTo(left + radius, boxBottom).arc(left + radius, boxBottom - radius, radius, 90, 180)
                // left line, top arc
                .lineTo(left, top + radius).arc(left + radius, top + radius, radius, 180, 270)
                .close();
        }
    })
    return shape;
}

export default CreateTextbox;