import enable3d, { Scene3D } from 'enable3d'

// STEP 5: Extend your Scene with Scene3D instead of Phaser.Scene
class Game extends Scene3D {
    constructor() {
        super({
            key: 'game'
        })

    }

    init() {
        // STEP 6: Request a worm whole to the third dimension.
        this.requestThirdDimension()
    }

    preload() {
    }

    create() {
        // STEP 7: Drive through the hole into the third dimension.
        this.accessThirdDimension()

        // STEP 8: Journey through the third dimension at warp speed.
        this.third.warpSpeed()

        // STEP 9: Add your first 3d object.
        this.third.add.box()

        // STEP 10: Add another box with physics enabled.
        this.third.physics.add.box()

        // STEP 11: Have fun using the third dimension in your awesome Phaser game.
        this.third.haveSomeFun()

        // rexUI test
        this.rexUI.add.label({
            anchor: {
                left: 'left+20',
                centerY: 'center'
            }, 
            width: 140, height: 40,

            background: this.rexUI.add.roundRectangle(0, 0, 40, 40, 10, 0x7b5e57),
            text: this.add.text(0, 0, 'Label'),
            align: 'center'
        })
            .layout()
    }

    update() { }
}
export default Game;