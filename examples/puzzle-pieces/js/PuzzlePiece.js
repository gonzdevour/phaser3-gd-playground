import PuzzlePieceBase from '../../../plugins/puzzlepiece/PuzzlePiece.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class PuzzlePiece extends PuzzlePieceBase {
    createClipPath(config) {
        var convexLeft = GetValue(config, 'left', 0);
        var convexRight = GetValue(config, 'right', 0);
        var convexTop = GetValue(config, 'top', 0);
        var convexBottom = GetValue(config, 'bottom', 0);

        var x0 = this.marginX,
            y0 = this.marginY,
            x1 = this.marginX + this.innerWidth,
            y1 = this.marginY + this.innerHeight,
            centerX = this.width / 2,
            centerY = this.height / 2,
            rx = this.marginX - (this.strokeWidth / 2),
            ry = this.marginY - (this.strokeWidth / 2);

        var lines = this.pathBuilder;

        lines
            .setIterations(16)
            .clear()
            .startAt(x0, y0)

        if (convexTop != 0) {
            lines.ellipticalArc(
                centerX, y0,
                rx, ry,
                180, 360,
                (convexTop === 1)
            );
        }

        lines.lineTo(x1, y0)

        if (convexRight != 0) {
            lines.ellipticalArc(
                x1, centerY,
                rx, ry,
                270, 90,
                (convexRight === -1)
            );
        }

        lines.lineTo(x1, y1)

        if (convexBottom != 0) {
            lines.ellipticalArc(
                centerX, y1,
                rx, ry,
                0, 180,
                (convexBottom === -1)
            );
        }

        lines.lineTo(x0, y1)

        if (convexLeft != 0) {
            lines.ellipticalArc(
                x0, centerY,
                rx, ry,
                90, 270,
                (convexLeft === 1)
            );
        }

        lines.lineTo(x0, y0)
        lines.close();

        return this;
    }
}

export default PuzzlePiece;