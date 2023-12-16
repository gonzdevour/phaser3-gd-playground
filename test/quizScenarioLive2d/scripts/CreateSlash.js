var CreateSlash = function (scene, slashLineWidth, slashSlope) {
    return scene.add.rexCustomProgress({
        type: 'SlashProgress',
        create: [
            { name: 'slash', type: 'lines' },
        ],
        update: function () {
            var slash = this.getShape('slash')
                .fillStyle(this.fillColor, this.fillAlpha)
                //.lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)
            /*
            x0   x3 - x4   x7
            |    |    |    |
            x1 - x2   x5 - x6
            */
            var width = this.width,
                height = this.height;
            var startX0 = width + (slashLineWidth + slashSlope +100+0.5*slashLineWidth);
            var endX0 = 0 - (slashLineWidth +100+0.5*slashLineWidth);
            var x0 = Phaser.Math.Linear(startX0, endX0, this.value);
            var x1 = x0 - slashSlope;
            var x2 = x1 + slashLineWidth;
            var x3 = x0 + slashLineWidth;

            var x4 = x3 + 100;
            var x5 = x2 + 100;
            var x6 = x5 + 0.5*slashLineWidth;
            var x7 = x4 + 0.5*slashLineWidth;

            x0 = Phaser.Math.Clamp(x0, 0, width);
            x1 = Phaser.Math.Clamp(x1, 0, width);
            x2 = Phaser.Math.Clamp(x2, 0, width);
            x3 = Phaser.Math.Clamp(x3, 0, width);

            x4 = Phaser.Math.Clamp(x4, 0, width);
            x5 = Phaser.Math.Clamp(x5, 0, width);
            x6 = Phaser.Math.Clamp(x6, 0, width);
            x7 = Phaser.Math.Clamp(x7, 0, width);

            slash
                .startAt(x0, 0)
                .lineTo(x1, height)
                .lineTo(x2, height)
                .lineTo(x3, 0)
                .lineTo(x4, 0)
                .lineTo(x5, height)
                .lineTo(x6, height)
                .lineTo(x7, 0)
                .close()

            // var slash2 = this.getShape('slash2')
            //     .fillStyle(this.fillColor, this.fillAlpha)
            //     //.lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)
            // /*
            // x0 - x3
            // |    |
            // x1 - x2
            // */
            // var width = this.width,
            //     height = this.height;
            // var startX0 = width + (slashLineWidth + slashSlope + 100 + 0.5*slashLineWidth);
            // var endX0 = 0 - (slashLineWidth + 100 + 0.5*slashLineWidth);
            // var x0 = Phaser.Math.Linear(startX0, endX0, this.value);
            // var x1 = x0 - slashSlope;
            // var x2 = x1 + 0.5*slashLineWidth;
            // var x3 = x0 + 0.5*slashLineWidth;

            // x0 = Phaser.Math.Clamp(x0, 0, width);
            // x1 = Phaser.Math.Clamp(x1, 0, width);
            // x2 = Phaser.Math.Clamp(x2, 0, width);
            // x3 = Phaser.Math.Clamp(x3, 0, width);

            // slash2
            //     .startAt(x0, 0)
            //     .lineTo(x1, height)
            //     .lineTo(x2, height)
            //     .lineTo(x3, 0)
            //     .close()

        },
    })
}

export default CreateSlash;