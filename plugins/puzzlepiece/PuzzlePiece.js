import Canvas from '../../../phaser3-rex-notes/plugins/canvas.js';
import PathDataBuilder from '../../../phaser3-rex-notes/plugins/geom/pathdata/PathDataBuilder/PathDataBuilder.js';
import AddPolygonPath from '../../../phaser3-rex-notes/plugins/utils/canvas/AddPolygonPath.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const PolygonContains = Phaser.Geom.Polygon.Contains;

class PuzzlePiece extends Canvas {
    constructor(scene, config) {
        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);
        var size = GetValue(config, 'size', 0);
        var width = GetValue(config, 'width', size);
        var height = GetValue(config, 'height', size);
        var margin = GetValue(config, 'margin');
        var marginX = GetValue(config, 'marginX', margin);
        var marginY = GetValue(config, 'marginY', margin);
        var strokeColor = GetValue(config, 'strokeColor');
        var strokeWidth = GetValue(config, 'strokeWidth', 1);

        if (marginX === undefined) {
            marginX = width / 5;
        }
        if (marginY === undefined) {
            marginY = height / 5;
        }
        if (strokeColor === undefined) {
            strokeWidth = 0;
        }

        var halfStrokeWidth = strokeWidth / 2;
        var canvasWidth = width + ((marginX + halfStrokeWidth) * 2),
            canvasHeight = height + ((marginY + halfStrokeWidth) * 2);

        super(scene, x, y, canvasWidth, canvasHeight);

        this.innerWidth = width;
        this.innerHeight = height;
        this.marginX = marginX;
        this.marginY = marginY;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;

        this.pathBuilder = new PathDataBuilder();
    }

    setTexture(config) {
        var key = GetValue(config, 'key');
        var frame = GetValue(config, 'frame');
        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);

        var points = this.pathBuilder.toPoints();

        var ctx = this.getContext();
        ctx.save();
        ctx.beginPath();

        AddPolygonPath(ctx, points);

        ctx.clip();

        this.drawFrame(
            key, frame,
            0, 0, this.width, this.height,
            x - this.marginX, y - this.marginY, this.width, this.height,
        );

        ctx.restore();

        // Stroke after pasting image
        ctx.save();

        if (this.strokeColor !== undefined) {
            ctx.strokeStyle = this.strokeColor;
            ctx.lineWidth = this.strokeWidth;
            ctx.stroke();
        }

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