import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })

    }

    preload() {
    }

    create() {
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 768,
    height: 1334,
    scale: {
        // mode: Phaser.Scale.ENVELOP,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Test
};

var game = new Phaser.Game(config);