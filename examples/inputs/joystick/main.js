import 'phaser/src/phaser';
import AllPlugins from "gdkPlugins/AllPlugins.js";
import createJoystick from './create/createJoystick.js';

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

        var bg = scene.add.image(0, 0, 'classroom')
            .setAlpha(0.2)
            ._locate({layerName:"bg", vpxOffset: viewport.centerX, vpyOffset: viewport.centerY,})

        var txtAngle = scene.rexUI.add.BBCodeText(0,0,"touchAngle", {fontSize:32})
            .setOrigin(0,0)
            ._locate({layerName:"ui", vpx:0, vpy:0, vpxOffset: 50, vpyOffset: 50})

        var joystick = createJoystick(scene, 'ui', 150, -150, 0, 1, {
                analog:true
            })
            .on("angleChange", function(angle){
                txtAngle.setText(angle);
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