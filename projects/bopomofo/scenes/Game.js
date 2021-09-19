import 'phaser';

class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'game'
        })

    }

    preload() {
    }

    create() {
        console.log('Game');
    }

    update() { }
}
export default Game;