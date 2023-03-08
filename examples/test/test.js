import 'phaser';
import Rotate from '../../plugins/tickbehaviors/Rotate.js';

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
        var gameObject = this.add.rectangle(400, 300, 200, 50, 0x888888);
        var rotationBehavior = new Rotate(gameObject, {
            speed: 200,
        })

    }
    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: Test
};

var game = new Phaser.Game(config);