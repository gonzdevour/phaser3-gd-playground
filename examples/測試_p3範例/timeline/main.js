import 'phaser';
import AllPlugins from 'gdkPlugins/AllPlugins.js';

class Test extends Phaser.Scene
{
    preload ()
    {
        this.load.pack('pack', 'assets/pack.json');
    }

    create ()
    {
        var sprite = this.add.image(512,400,'right').setScale(0.2,0.2)
        const timeline = this.add.timeline(
            {
                at: 0,
                tween: {
                    targets: sprite,
                    x: sprite.x + 200,
                    ease: 'Cubic',
                    duration: 4000,
                }
            },
            {
                at: 100,
                tween: {
                    targets: sprite,
                    y: sprite.y - 100,
                    ease: 'Cubic',
                    duration: 300,
                    yoyo: true,
                    repeat: 3
                }
            },
        );
        timeline.play();

        // this.tweens.add({
        //     targets: sprite,
        //     x: sprite.x + 200,
        //     ease: 'Cubic',
        //     duration: 4000, 
        // })
        // this.tweens.add({
        //     targets: sprite,
        //     y: sprite.y - 100,
        //     ease: 'Cubic',
        //     duration: 300,
        //     yoyo: true,
        //     repeat: 3
        // })
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