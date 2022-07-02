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

        var img = this.add.image(0,0,'yes');
        this.plugins.get('rexAnchor').add(img, {
            left: 'left+10',
            //right: 'right',
            //top: 'top',
            bottom: 'bottom-10'
        });

        //draw viewport
        this.add.graphics()
            .clear()
            .lineStyle(10, 0x00ff00)
            .strokeRectShape(this.rexScaleOuter.innerViewport)
            .lineStyle(30, 0xff0000)
            .strokeRectShape(this.rexScaleOuter.outerViewport)

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