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
        this.add.text(400, 300, 'Test');
    }

    update() { }
}

export default Test;