import phaser from 'phaser/src/phaser.js';
import AllPlugins from '../../plugins/AllPlugins.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    init() {
        this.rexScaleOuter.scale();
    }

    preload() {
        //load pack
        this.load.pack('pack', 'assets/pack.json');
    }

    create() {
        this.input.on('pointerdown', function(pointer){
            this.add.image(pointer.x, pointer.y, 'yes');
        },this)
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 768,
    height: 1334,
    scale: {
        mode: Phaser.Scale.RESIZE, //scaleOuter plugin需要RESIZE mode
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Demo,
};

var game = new Phaser.Game(config);