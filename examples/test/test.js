import 'phaser';

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
    width: 800,
    height: 600,
    scene: Test
};

var game = new Phaser.Game(config);