import 'phaser';
import AllPlugins from 'allRexPlugins';

class Test extends Phaser.Scene
{
    preload ()
    {
        this.load.pack('pack', 'assets/pack.json');
    }

    create ()
    {
        this.aliens = [];
        //  This is our 'wrapping rectangle'
        //  When a sprite leaves this, it'll be wrapped around
        this.wrapRect = new Phaser.Geom.Rectangle(214, 132, 367, 239);

        this.add.rectangle(this.wrapRect.x, this.wrapRect.y, this.wrapRect.width, this.wrapRect.height, 0x0094bf).setOrigin(0, 0);

        for (let i = 0; i < 64; i++)
        {
            const x = Phaser.Math.Between(this.wrapRect.left, this.wrapRect.right);
            const y = Phaser.Math.Between(this.wrapRect.top, this.wrapRect.bottom);

            this.aliens.push(this.add.image(x, y, 'right').setScale(0.1, 0.1));
        }
        this.rexUI.add.roundRectangle(100, 80, 100, 100, 0, 0x008888);
    }
    update ()
    {
        //  Move all the sprites
        Phaser.Actions.IncXY(this.aliens, 1.5, 2.5, 0.04);

        //  Wrap the sprites within our wrapping rectangle, with an 8px buffer
        Phaser.Actions.WrapInRectangle(this.aliens, this.wrapRect, 8);
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1024,
    height: 800,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Test
};

const game = new Phaser.Game(config);