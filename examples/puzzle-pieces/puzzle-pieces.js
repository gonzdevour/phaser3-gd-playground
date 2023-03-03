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
        var bg = this.add.image(width / 2, height / 2, 'classroom');

        var verticalEdges = [
            [0, -1, 1, -1, 1, 0],
            [0, 1, -1, 1, -1, 0],
            [0, -1, -1, 1, 1, 0],
            [0, 1, 1, -1, -1, 0],
            [0, -1, 1, -1, 1, 0],
        ];
        var horizontalEdges = [
            [0, -1, 1, -1, 1, 0],
            [0, 1, -1, 1, -1, 0],
            [0, -1, -1, 1, 1, 0],
            [0, 1, 1, -1, -1, 0],
            [0, -1, 1, -1, 1, 0],
        ];

        var pieces = CreatePieces(this, 'classroom', undefined, verticalEdges, horizontalEdges);

        var topLeft = bg.getTopLeft(),
            tlx = topLeft.x, tly = topLeft.y;
        for (var i = 0, cnt = pieces.length; i < cnt; i++) {
            var piece = pieces[i];
            var x = tlx + (piece.cellX * piece.innerWidth) + (piece.innerWidth * 0.5);
            var y = tly + (piece.cellY * piece.innerHeight) + (piece.innerHeight * 0.5);

            pieces[i]
                .setAlpha(0.5)
                .setPosition(x, y)
                .setInteractive({ draggable: true })
                .on('drag', function (pointer, dragX, dragY) {
                    this.setPosition(dragX, dragY);
                });
        }
    }
    update() { }
}

var CreatePieces = function (scene, key, frame, verticalEdgesArray, horizontalEdgesArray) {
    var columnCount = verticalEdgesArray[0].length - 1;
    var rowCount = horizontalEdgesArray[0].length - 1;
    var image = scene.textures.getFrame(key, frame);
    var pieceWidth = image.cutWidth / columnCount,
        pieceHeight = image.cutHeight / rowCount;
    var pieces = [];
    for (var j = 0; j < rowCount; j++) {
        for (var i = 0; i < columnCount; i++) {
            var piece = new PuzzlePiece(scene, {
                width: pieceWidth, height: pieceHeight,
                strokeColor: 'white', strokeWidth: 5,
            })
            scene.add.existing(piece);

            piece
                .createClipPath({
                    left: verticalEdgesArray[j][i], right: verticalEdgesArray[j][i + 1],
                    top: horizontalEdgesArray[i][j], bottom: horizontalEdgesArray[i][j + 1],
                })
                .setTexture({
                    key: key, frame: frame,
                    x: i * pieceWidth,
                    y: j * pieceHeight,
                })

            piece.cellX = i;
            piece.cellY = j;
            pieces.push(piece);
        }
    }

    return pieces;
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