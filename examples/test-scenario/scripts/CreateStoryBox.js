import TextPlayer from "../../../../phaser3-rex-notes/plugins/textplayer";
import ContainerLite from '../../../../phaser3-rex-notes/plugins/containerlite.js';
import AutoRemoveTween from '../../../../phaser3-rex-notes/plugins/utils/tween/AutoRemoveTween';

class StoryBox extends ContainerLite {
    constructor(scene, x, y, width, height) {
        var background = CreateCustomShape(scene);
        var textPlayer = CreateTextPlayer(scene, x, y, width, height);
        var nameLabel = createNameLabel(scene, x-0.5*width, y-0.5*height);

        super(scene, 0, 0, [background, textPlayer, nameLabel]);

        this.background = background;
        this.textPlayer = textPlayer;
        this.nameLabel = nameLabel;

        this.scene = scene;
        this.scenario = scene.scenario;
    }
    playPromise(content) {
        return this.textPlayer.playPromise(content);
    }
}

var createNameLabel = function (scene, x, y) {
    return scene.rexUI.add.label({
        x: x, y: y,
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, '#49390c'),
        text: scene.add.text(0, 0, 'Leonardo Dicapio', {fontSize: 48}),
        icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 50, '#cfb366'),
        align: 'center',
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10},
    })
    .layout();
}

var CreateTextPlayer = function(scene, x, y, width, height){
    var Cubic = Phaser.Math.Easing.Cubic.Out;
    var Back = Phaser.Math.Easing.Back.In;
    var Linear = Phaser.Math.Easing.Linear;
    var Lerp = Phaser.Math.Linear;
    var textPlayer = new TextPlayer(scene, 
        {
            x: x, y: y, width: width, height: height,  // Fixed width and height

            background: { 
                stroke: 'white', strokeThickness: 6, cornerRadius: 20, 
                color: 'rgba(0, 0, 0, 100)', //color2: 'rgba(8, 9, 107, 0.5)', horizontalGradient: true, 
            },

            //innerBounds: { stroke: '#A52A2A' },
            padding: {left: 40, right: 40, top: 20, bottom: 20},
            style: {
                fontSize: '48px',
                stroke: 'green', strokeThickness: 3,
                shadowColor: 'red', shadowOffsetX: 5, shadowOffsetY: 5, shadowBlur: 3
            },
            typing: {
                speed: 100,  // 0: no-typing
                animation: {
                    duration: 300,
                    yoyo: true,
                    onStart: function (char) {
                        char
                            .setVisible()
                            .setData('x', char.x)
                            .setData('y', char.y)
                    },
                    onProgress: function (char, t) {
                        var p0 = char.getData('x');
                        var p1 = p0 + 10;
                        var value = Lerp(p0, p1, Linear(t));
                        char.setX(value);

                        var p0 = char.getData('y');
                        var p1 = p0 - 10;
                        var value = Lerp(p0, p1, Cubic(t));
                        char.setY(value);

                        // var value = Linear(1, 0.5, Cubic(t));
                        // char.setAlpha(value);

                        // var value = Lerp(255, 0, Linear(t));
                        // char.modifyStyle({
                        //     // bold: false,
                        //     // italic: false,
                        //     // fontSize: '16px',
                        //     // fontFamily: 'Courier',
                        //     //color: `rgb(${value},${value},${value})`,
                        //     //color: `rgb(255,${value},${value})`
                        //     // stroke: '#fff',
                        //     // strokeThickness: 0,
                        //     // shaodwColor: null,
                        //     // shadowBlur: 0,
                        //     // shadowOffsetX: 0,
                        //     // shadowOffsetY: 0,
                        //     // backgroundColor: null,
                        //     // offsetX: 0,
                        //     // offsetY: 0
                        // })

                        var value = Lerp(1, 1.2, Cubic(t));
                        char.setScale(value);
                    }
                }
            },
            clickTarget: null, //如果要自訂就填null再用setClickTarget設定
            wrap: { charWrap: true, maxLines: 5, padding: { bottom: 10 }, lineHeight: 48, },
            nextPageInput: 'click|2000'
            // nextPageInput: function(callback) {
            //     console.log('Custom next-page-input')
            //     callback();
            // }
        }
    )

    //在scene上畫出inst
    //scene.add.existing(textPlayer);
    textPlayer.angle = -2;
    //textPlayer.setVisible(false);

    //對話框彈出效果
    textPlayer.popTween = scene.tweens.add({
        targets: textPlayer,
        x: {from:textPlayer.x-20, to:textPlayer.x},
        y: {from:textPlayer.y+20, to:textPlayer.y},
        alpha: {from: 0, to:1},
        ease: 'cubic',
        //duration: textPlayer.typingSpeed,
        duration: 500,
        paused: true,
    });

    textPlayer.backTween = scene.tweens.add({
        targets: textPlayer,
        x: '-=20',
        y: '+=20',
        alpha: 0,
        ease: 'cubic',
        duration: 500,
        paused: true,
    });

    //對話斷點的三角形特效
    textPlayer.triangle = scene.add.triangle(200, 200, 0, 36, 36, 36, 18, 72, 0xffffff).setVisible(false); //#ffffff
    textPlayer.triangle.setPosition(textPlayer.x + 0.5*textPlayer.width - 40, textPlayer.y + 0.5*textPlayer.height - 95); //-85
    textPlayer.triangle.tween = AutoRemoveTween(textPlayer.triangle, {
        y: '+=10',
        ease: 'Linear',
        duration: 500,
        yoyo: true,
        repeat: -1,
        //paused: true,
    })

    //指定click target
    textPlayer.setClickTarget(scene.toucharea);
    textPlayer.clickTarget.onClick(function () {
        if (!textPlayer.isPlaying) {
            return;
        }

        if (textPlayer.isPageTyping) {
            textPlayer.setTypingSpeed(0);
        } else {
            textPlayer.typingNextPage();
        }
    })

    //事件觸發
    
    textPlayer
        .on('wait.timeout', function(Callback){ //custom tag的範例
            var waitTime = async function(ms){
                await new Promise(resolve => setTimeout(resolve, ms));
                Callback();
            }
            waitTime(2000);
        })
        .on('page.start', function() {
            //console.log('typingSpeed: ' + textPlayer.typingSpeed)
            textPlayer.popTween.play();
            textPlayer.setTypingSpeed(100);
            textPlayer.triangle.setVisible(false);
        })
        .on('wait.click', function() {
            console.log('wait click')
            textPlayer.triangle.setVisible(true);
        })
        .on('typing', function(child) {
            if (child.type === 'text') {
                //textPlayer.character.lipTween.play();
            }
        })
        .on('complete', function() {
            textPlayer.popTween.stop();
        })

    return textPlayer
}

var CreateCustomShape = function (scene, speaker) {
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

var CreateStoryBox = function (scene, x, y, width, height) {
    var newBox = new StoryBox(scene, x, y, width, height);
    //scene.add.existing(newBox); //因為layer.add會將物件放進displayList中並排序，scene.add.exsiting也會，同時使用會導致順序錯亂
    //newBox.changeOrigin(200,200);
    return newBox;
  }

export default CreateStoryBox;