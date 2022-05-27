import phaser from 'phaser/src/phaser.js';
import TextPlayer from "../../../phaser3-rex-notes/plugins/textplayer";
import { DialogSelect } from '../../projects/tpl_newProj/build/view/modaldialog/DialogType';

var CreateTextplayer = function(scene){
    var Cubic = Phaser.Math.Easing.Cubic.Out;
    var Linear = Phaser.Math.Linear;
    var textPlayer = new TextPlayer(scene,
        {
            x: 400, y: 300,
            width: 400, height: 200,  // Fixed width and height

            background: {
                stroke: 'white',
                cornerRadius: 20
            },

            innerBounds: {
                stroke: '#A52A2A'
            },

            padding: 20,

            style: {
                fontSize: '16px',
                stroke: 'green',
                strokeThickness: 3,

                shadowColor: 'red',
                shadowOffsetX: 5,
                shadowOffsetY: 5,
                shadowBlur: 3
            },

            wrap: {
                maxLines: 5,
                padding: { bottom: 10 },
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
            clickTarget: scene,
            nextPageInput: 'click|2000'
            // nextPageInput: function(callback) {
            //     console.log('Custom next-page-input')
            //     callback();
            // }

        }
    )

    // Events
    textPlayer
        .on('wait.timeout', function(Callback){
            var waitTime = async function(ms){
                await new Promise(resolve => setTimeout(resolve, ms));
                Callback();
            }
            waitTime(2000);
        })
        .on('wait.dialog', function(Callback){
            var waitDialog = async function(_scene){
                //config.buttonsData:{ifShuffle:1/0, list:[{imgKey:key, text:text, indexFixed:0/1},...]}
                var config = {
                    buttonsData:{
                        ifShuffle:0,
                        list:[
                            {imgKey: 'yes', text: 'btn0', indexFixed:0},
                            {imgKey: 'yes', text: 'btn1', indexFixed:1},
                            {imgKey: 'yes', text: 'btn2', indexFixed:0},
                            {imgKey: 'yes', text: 'btn3', indexFixed:0},
                        ],
                    }
                }
                var result = await DialogSelect(_scene, 'test title', 'test content', config)
                Callback();
            }
            waitDialog(scene);
        })

    //在scene上畫出inst
    scene.add.existing(textPlayer);
    return textPlayer
}

export default CreateTextplayer;