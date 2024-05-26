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

        //scene.clickArea.tint = 0xff0000;
        //scene.clickArea.alpha = 0.2;
        scene.vpRect.setStrokeStyle(10, 0x0000ff, 1)

        scene.gd.add.textLabel(400, 200, 'ui', 'AABB').layout()

        scene.add.text(600, 200, 'Restart')
            .setInteractive()
            .once('pointerup', function () {
                console.log('Test gd plugin restart')
                scene.scene.restart()
            })

        scene.input.on('pointerup.none', function(){
            console.log('pointerup on nothing')
        })

        var bg = scene.add.image(0, 0, 'classroom')
        ._locate({layerName:"bg", vpxOffset: viewport.centerX, vpyOffset: viewport.centerY,})
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