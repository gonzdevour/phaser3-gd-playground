import 'phaser';
import AllPlugins from 'allRexPlugins';

class Test extends Phaser.Scene
{
    preload ()
    {
        //this.load.pack('pack', 'assets/pack.json');
        this.load.setBaseURL('https://labs.phaser.io');

        this.load.atlas('gems', 'assets/tests/columns/gems.png', 'assets/tests/columns/gems.json');
        // Local variable
        this.y = 160;
    }

    create ()
    {
        this.add.text(400, 32, 'Click to create animations', { color: '#00ff00' })
            .setOrigin(0.5, 0);

        //  Each time a new animation is added to the Animation Manager we'll call this function
        this.anims.on(Phaser.Animations.Events.ADD_ANIMATION, this.addAnimation, this);

        this.i = 0;

        //  Click to add an animation
        this.input.on('pointerup', function () {
            switch (this.i)
            {
                case 0:
                    this.anims.create({ key: 'diamond', frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }), repeat: -1 });
                    break;

                case 1:
                    this.anims.create({ key: 'prism', frames: this.anims.generateFrameNames('gems', { prefix: 'prism_', end: 6, zeroPad: 4 }), repeat: -1 });
                    break;

                case 2:
                    this.anims.create({ key: 'ruby', frames: this.anims.generateFrameNames('gems', { prefix: 'ruby_', end: 6, zeroPad: 4 }), repeat: -1 });
                    break;

                case 3:
                    this.anims.create({ key: 'square', frames: this.anims.generateFrameNames('gems', { prefix: 'square_', end: 14, zeroPad: 4 }), repeat: -1 });
                    break;
            }
            this.i++;
        }, this);
    }
    update ()
    {
    }
    addAnimation (key)
    {
        this.add.sprite(400, this.y, 'gems')
            .play(key);
        this.y += 100;
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