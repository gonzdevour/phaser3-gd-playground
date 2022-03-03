//env
import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';
import Base from './scenes/Base.js';

//to test
import CreateModalKnob from './build/view/modalKnob/CreateModalKnob.js';

class Test extends Base {
    constructor() {
        super({
            key: 'test'
        })

    }

    preload() {
    }

    create() {
        CreateModalKnob(this);
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 768,
    height: 1334,
    scale: {
        mode: Phaser.Scale.RESIZE, //scaleOuter plugin需要RESIZE mode
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: [Test]
};

var game = new Phaser.Game(config);