import phaser from 'phaser/src/phaser.js';
import TextPlayer from "../../../phaser3-rex-notes/plugins/textplayer";

var CreateTextplayer = function(scene){
    var Cubic = Phaser.Math.Easing.Cubic.Out;
    var Linear = Phaser.Math.Linear;
    var textPlayer = new TextPlayer(scene,
        {
            x: scene.viewport.centerX, y: scene.viewport.height-200-25,
            width: scene.viewport.width-50, height: 400,  // Fixed width and height

            background: { stroke: 'white', cornerRadius: 20 },
            innerBounds: { stroke: '#A52A2A' },
            padding: 20,
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
            clickTarget: null,
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
    })

    //指定click target
    textPlayer.setClickTarget(textPlayer);
    textPlayer.clickTarget.on('pointerup', function () {
        if (!textPlayer.isPlaying) {
            return;
        }

        if (textPlayer.isPageTyping) {
            textPlayer.setTypingSpeed(0);
            //textPlayer.showPage();  // Show all characters in this page
        } else {
            textPlayer.typingNextPage();
        }
    })
    //在scene上畫出inst
    scene.add.existing(textPlayer);

    return textPlayer
}

export default CreateTextplayer;