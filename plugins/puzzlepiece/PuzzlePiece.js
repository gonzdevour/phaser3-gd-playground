import Canvas from '../../../phaser3-rex-notes/plugins/canvas.js';
import PathDataBuilder from '../../../phaser3-rex-notes/plugins/geom/pathdata/PathDataBuilder/PathDataBuilder.js';
import AddPolygonPath from '../../../phaser3-rex-notes/plugins/utils/canvas/AddPolygonPath.js';

const PolygonContains = Phaser.Geom.Polygon.Contains;

class PuzzlePiece extends Canvas {
    constructor(scene, config) {
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

        super(scene, 0, 0, canvasWidth, canvasHeight);

        this.innerWidth = width;
        this.innerHeight = height;
        this.margin = margin;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;

        this.pathBuilder = new PathDataBuilder();
        this.createClipPathCallback = config.createClipPath;
    }

    // Override this methos
    // createClipPath(config) {
    // }

    setTexture(config) {
        var ctx = this.getContext();
        ctx.save();
        ctx.beginPath();

        AddPolygonPath(ctx, this.pathBuilder.toPoints());

        if (this.strokeColor !== undefined) {
            ctx.strokeStyle = this.strokeColor;
            ctx.lineWidth = this.strokeWidth;
            ctx.stroke();
        }

        ctx.clip();

        var key = config.key,
            frame = config.frame;
        var x = config.x,
            y = config.y;
        this.drawFrame(
            key, frame,
            0, 0, this.width, this.height,
            x - this.margin, y - this.margin, this.width, this.height,
        );

        ctx.restore();

        return this;
    }

    setInteractive(shape, callback) {
        if (!this.input) {
            if (shape === undefined) {
                shape = this.pathBuilder.toPolygon();
                callback = PolygonContains;
            } else { // shape is a configuration object
                if (shape.hitArea === undefined) {
                    shape.hitArea = this.pathBuilder.toPolygon();
                    shape.hitAreaCallback = PolygonContains;
                }
            }
        }

        super.setInteractive(shape, callback);
        return this;
    }
}

export default PuzzlePiece;