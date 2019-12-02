import Create3x3NinePatch from '../../utils/Create3x3NinePatch.js';

class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'game'
        })

    }

    preload() {
        // Load assets from assets folder
        this.load.image('classroom', 'assets/classroom.png');
        this.load.image('uiBg0', 'assets/nine-patch.png');
        this.load.json('uiBg0', 'assets/nine-patch.json');

        // Load assets from root-assets folder
        this.load.image('key', 'key.png');
    }

    create() {
        console.log('Game');

        // Example of creating sprite/image
        this.add.image(400, 300, 'classroom');

        this.add.image(400, 300, 'key');

        // Example of creating ui component
        this.rexUI.add.label({
            orientation: 'x',
            anchor: {
                left: 'left',
                centerY: 'center'
            },

            background: Create3x3NinePatch(this, 'uiBg0', this.cache.json.get('uiBg0')),
            icon: this.rexUI.add.roundRectangle(0, 0, 40, 40, 10, 0x7b5e57),
            text: this.add.text(0, 0, 'Label', {
                color: 'black',
            }),
            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                icon: 10,
            },
        })
            .setOrigin(0, 0.5)
            .layout();
    }

    update() { }
}
export default Game;