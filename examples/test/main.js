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
        var pic = this.add.image(400, 300, 'right')
        //pic.setScale(0.5);
        pic.setDisplaySize(50,50);
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