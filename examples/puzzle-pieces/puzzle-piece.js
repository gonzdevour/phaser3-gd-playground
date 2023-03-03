import 'phaser';
import PuzzlePiece from './js/PuzzlePiece.js';

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
        var { width, height } = this.scale;

        this.add.image(width / 2, height / 2, 'classroom');

        var canvas = new PuzzlePiece(this, {
            x: width / 2, y: height / 2,
            width: 100, height: 100, margin: 20,
            strokeColor: 'red', strokeWidth: 5,
        })
        canvas.setAlpha(0.5);
        this.add.existing(canvas);

        canvas
            .createClipPath({
                left: -1, right: 1, top: 1, bottom: 0
            })
            .setTexture({
                key: 'classroom',
                x: 100, y: 100,
            })

        var debugGraphics = this.add.graphics()

        var DrawBound = function () {
            debugGraphics
                .clear()
                .lineStyle(1, 0xffffff, 1)
                .strokeRectShape(canvas.getBounds())
        }
        DrawBound();

        canvas
            .setInteractive({ draggable: true })
            .on('drag', function (pointer, dragX, dragY) {
                canvas.setPosition(dragX, dragY);

                DrawBound()
            });
    }
    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1024,
    height: 768,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Test
};

var game = new Phaser.Game(config);