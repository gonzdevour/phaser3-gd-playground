import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';
import ContainerLite from '../../../phaser3-rex-notes/plugins/containerlite.js';
import AutoRemoveTween from '../../../phaser3-rex-notes/plugins/utils/tween/AutoRemoveTween.js';

class Test1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'test1'
        })
    }
    preload() {
        this.load.pack('pack', 'assets/pack.json');
    }
    create() {
        var content = `[color=#F8F8FF][align=center]You can use JavaScript or TypeScript for development.`
        var Cubic = Phaser.Math.Easing.Cubic.Out;
        var Linear = Phaser.Math.Linear;
        var text = this.rexUI.add.textPlayer({
                x: 0, y: 0, width: 400, height: 200,  // Fixed width and height
                // background: { stroke: 'white', cornerRadius: 20 },
                // innerBounds: { stroke: '#A52A2A'},
                padding: 20,
                style: {
                    fontSize: '16px', stroke: 'green', strokeThickness: 3,
                    shadowColor: 'red', shadowOffsetX: 5, shadowOffsetY: 5, shadowBlur: 3
                },
                wrap: { maxLines: 5, padding: { bottom: 10 }},
                typing: {
                    speed: 50,  // 0: no-typing
                    animation: {
                        duration: 1000,
                        yoyo: true,
                        onStart: function (char) {
                            char.setVisible().setData('y', char.y);
                        },
                        onProgress: function (char, t) {
                            var p0 = char.getData('y');
                            var p1 = p0 - 20;
                            var value = Linear(p0, p1, Cubic(t));
                            char.setY(value);
                        }
                    },
                    // minSizeEnable: true
                },
                clickTarget: this,
                nextPageInput: 'click|2000'
            }
        ) //.setToMinSize()


        var rect1 = this.rexUI.add.roundRectangle(0,200,64,64,10, 0xff00ff);

        var rect2 = this.rexUI.add.roundRectangle(0,0,64,64,10, 0xff0000);
        var panel = this.rexUI.add.sizer({
            x:512, y:400
        })
        .add(rect2, {key: 'rect2'})
        .add(text, {key: 'text', proportion:1, expand:true})
        .layout()

        var ctnr = new ContainerLite(this, 0, 0, [rect1, panel])
        this.add.existing(ctnr);

        this.input.on('pointerup', function(){
            AutoRemoveTween(panel, {
                x: {from:panel.x-20, to:panel.x},
                y: {from:panel.y+20, to:panel.y},
                alpha: {from: 0, to:1},
                ease: 'cubic',
                duration: 600, //duration: this.textPlayer.typingSpeed,
            })
        })

        text.playPromise(content);
    }
    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1024,
    height: 800,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: [Test1]
};

var game = new Phaser.Game(config);