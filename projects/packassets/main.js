import 'phaser';

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
        this.add.image(300, 300, 'key');
        this.add.image(400, 300, 'person');
        this.add.image(500, 300, 'bolt');

        console.log(this.cache.text.get('csvArray'));
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