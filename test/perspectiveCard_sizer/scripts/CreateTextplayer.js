import TextPlayer from "../../../../phaser3-rex-notes/plugins/textplayer";
import CreateChar from './CreateChar';
import AutoRemoveTween from '../../../../phaser3-rex-notes/plugins/utils/tween/AutoRemoveTween';

var CreateTextplayer = function(scene){
    var Cubic = Phaser.Math.Easing.Cubic.Out;
    var Linear = Phaser.Math.Linear;
    var textPlayer = new TextPlayer(scene,
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

    //在scene上畫出inst
    scene.add.existing(textPlayer);
    textPlayer.angle = -2;
    textPlayer.setVisible(false);

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

    //建立textPlayer專用的live2D角色
    //this.children.moveBelow(textPlayer, character);
    textPlayer.character = CreateChar(scene, 'Haru');
    textPlayer.character.lipTween = scene.tweens.add({
        targets: textPlayer.character,
        lipSyncValue: {from:0, to:1},
        ease: 'Linear',
        //duration: textPlayer.typingSpeed,
        duration: 150,
        yoyo: true,
        paused: true,
    });

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
                textPlayer.character.lipTween.play();
            }
        })
        .on('complete', function() {
            textPlayer.popTween.stop();
            textPlayer.character.lipTween.stop();
            textPlayer.character.lipSyncValue = 0;
        })

    return textPlayer
}

export default CreateTextplayer;