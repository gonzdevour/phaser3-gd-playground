import phaser from 'phaser/src/phaser.js';
import TextPlayer from "../../../phaser3-rex-notes/plugins/textplayer";
import TagPlayer from '../../../phaser3-rex-notes/plugins/tagplayer';
import AutoRemoveTween from '../../../phaser3-rex-notes/plugins/utils/tween/AutoRemoveTween';

var CreateTextplayer = function(scene){
    var Cubic = Phaser.Math.Easing.Cubic.Out;
    var Linear = Phaser.Math.Linear;
    var textPlayer = new TagPlayer(scene,
        {
            x: scene.viewport.centerX+5, y: scene.viewport.top+200+25,
            width: scene.viewport.displayWidth-50, height: 400,  // Fixed width and height

            background: { 
                stroke: 'white', strokeThickness: 6, cornerRadius: 20, 
                color: 'rgba(8, 9, 107, 1)', color2: 'rgba(8, 9, 107, 0.5)', horizontalGradient: true, 
            }, //rgba(8, 9, 107, 0.2)

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
                            .setData('y', char.y);
                    },
                    onProgress: function (char, t) {
                        var p0 = char.getData('y');
                        var p1 = p0 - 20;
                        var value = Linear(p0, p1, Cubic(t));
                        char.setY(value);
                    }
                }
            },
            clickTarget: null, //如果要自訂就填null再用setClickTarget設定
            wrap: { charWrap: true, maxLines: 5, padding: { bottom: 10 }, },
            nextPageInput: 'click|2000'
            // nextPageInput: function(callback) {
            //     console.log('Custom next-page-input')
            //     callback();
            // }
        }
    )

    textPlayer.on('page.start', function() {
        //console.log('typingSpeed: ' + textPlayer.typingSpeed)
        textPlayer.setTypingSpeed(100);
        triangle.setVisible(false);
    })

    textPlayer.on('wait.click', function() {
        console.log('wait click')
        triangle.setVisible(true);
    })

    //指定click target

    textPlayer.setClickTarget(scene.touchArea);
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

    //在scene上畫出inst
    scene.add.existing(textPlayer);
    textPlayer.angle = -2;
    textPlayer.setVisible(false);

    var triangle = scene.add.triangle(200, 200, 0, 36, 36, 36, 18, 72, 0xffffff).setVisible(false); //#ffffff
    triangle.setPosition(textPlayer.x + 0.5*textPlayer.width - 40, textPlayer.y + 0.5*textPlayer.height - 95); //-85
    triangle.tween = AutoRemoveTween(triangle, {
        y: '+=10',
        ease: 'Linear',
        duration: 500,
        yoyo: true,
        repeat: -1,
        //paused: true,
    })

    return textPlayer
}

export default CreateTextplayer;