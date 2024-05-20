import 'phaser';
import GDSystemPlugin from '../../plugins/gdsystem/gdsystem-plugin.js';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })
    }

    preload() {


    }

    create() {
        this.gd.add.textLabel(400, 300, 'AABB').layout()
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: Test,
    plugins: {
        scene: [
            {
                key: 'gd',
                plugin: GDSystemPlugin,
                mapping: 'gd'
            },
        ]
    }
};

var game = new Phaser.Game(config);