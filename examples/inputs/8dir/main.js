import 'phaser/src/phaser';
import AllPlugins from "gdkPlugins/AllPlugins.js";

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })
    }

    preload() {
        this.load.pack('pack', 'assets/pack.json');
    }

    create() {
        var scene = this;
        var viewport = scene.viewport;
        scene.vpRect.setStrokeStyle(10, 0x0000ff, 1)
        scene.vpc = scene.plugins.get('rexViewportCoordinate');

        scene.input.addPointer(1);//增加一個觸控點

        var joyStick = this.plugins.get('rexVirtualJoystick').add(this, {
            radius: 100,
            // base: this.add.circle(0, 0, 100, 0x888888),
            // thumb: this.add.circle(0, 0, 50, 0xcccccc),
            // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
            // forceMin: 16,
            // enable: true
        })
        joyStick
        ._Locate({ layerName: "ui", vpx:0, vpy:1, vpxOffset:100, vpyOffset:-100 })

        var button = this.add.circle(0, 0, 50).setStrokeStyle(2, 0xff0000)
            ._Locate({ layerName: "ui", vpx:1, vpy:1, vpxOffset:-100, vpyOffset:-100 })
            .setInteractive()
            .on('pointerdown', function () {
                print.text += 'Click Button\n';
            })



    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: Test,
    plugins: AllPlugins,
    scale: {
        mode: Phaser.Scale.EXPAND,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    dom: {
        createContainer: true
    },
};

var game = new Phaser.Game(config);