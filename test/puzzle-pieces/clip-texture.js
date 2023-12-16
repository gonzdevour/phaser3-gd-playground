import 'phaser';
import Canvas from '../../../phaser3-rex-notes/plugins/canvas.js';
import PathDataBuilder from '../../../phaser3-rex-notes/plugins/geom/pathdata/PathDataBuilder/PathDataBuilder.js';
import AddPolygonPath from '../../../phaser3-rex-notes/plugins/utils/canvas/AddPolygonPath.js';

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

        var canvas = CreateCanvas(this, {
            width: 100, height: 100, margin: 20,

            key: 'classroom',
            clipX: 100, clipY: 100,

            strokeColor: 'red', strokeWidth: 5,
            convexEdges: {
                left: -1, right: 1, top: 1, bottom: 0
            }
        })
        canvas.setAlpha(0.5);

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

var CreateCanvas = function (scene, config) {
    var width = config.width,
        height = config.height,
        margin = config.margin;

    var strokeColor = config.strokeColor,
        strokeWidth = config.strokeWidth;

    if (strokeColor === undefined) {
        strokeWidth = 0;
    }

    margin += strokeWidth;

    var canvasWidth = width + (margin * 2),
        canvasHeight = height + (margin * 2);
    var canvas = new Canvas(scene, 0, 0, canvasWidth, canvasHeight);
    scene.add.existing(canvas);   

    var centerX = canvasWidth / 2,
        centerY = canvasHeight / 2;
    var x0 = margin,
        y0 = margin,
        x1 = margin + width,
        y1 = margin + height,
        r = margin - strokeWidth,
        convexEdges = config.convexEdges;
    var lines = new PathDataBuilder();
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
    lines.close()

    var ctx = canvas.getContext();
    ctx.save();
    ctx.beginPath();

    AddPolygonPath(ctx, lines.toPoints());

    if (strokeColor !== undefined) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.stroke();
    }

    ctx.clip();

    var key = config.key,
        frame = config.frame;
    var clipX = config.clipX,
        clipY = config.clipY;
    canvas.drawFrame(
        key, frame,
        0, 0, canvasWidth, canvasHeight,
        clipX - margin, clipY - margin, canvasWidth, canvasHeight,
    );

    ctx.restore();

    return canvas;
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