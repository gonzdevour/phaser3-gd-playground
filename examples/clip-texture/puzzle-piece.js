import 'phaser';
import PuzzlePiece from '../../plugins/puzzlepiece/PuzzlePiece.js';

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

        var canvas = new MyPuzzlePiece(this, {
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

class MyPuzzlePiece extends PuzzlePiece {
    createClipPath(convexEdges) {
        var x0 = this.margin,
            y0 = this.margin,
            x1 = this.margin + this.innerWidth,
            y1 = this.margin + this.innerHeight,
            centerX = this.width / 2,
            centerY = this.height / 2,
            r = this.margin - this.strokeWidth;
        var lines = this.pathBuilder;

        lines
            .setIterations(16)
            .clear()
            .startAt(x0, y0)

        if (convexEdges.top != 0) {
            lines.arc(centerX, y0, r, 180, 360, (convexEdges.top === -1));
        }

        lines.lineTo(x1, y0)

        if (convexEdges.right != 0) {
            lines.arc(x1, centerY, r, 270, 90, (convexEdges.right === -1));
        }

        lines.lineTo(x1, y1)

        if (convexEdges.bottom != 0) {
            lines.arc(centerX, y1, r, 0, 180, (convexEdges.bottom === -1));
        }

        lines.lineTo(x0, y1)

        if (convexEdges.left != 0) {
            lines.arc(x0, centerY, r, 90, 270, (convexEdges.left === -1));
        }

        lines.lineTo(x0, y0)
        lines.close();

        return this;
    }
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