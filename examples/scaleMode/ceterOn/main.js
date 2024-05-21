import 'phaser/src/phaser';
import AllPlugins from 'gdkPlugins/AllPlugins.js';

class Test extends Phaser.Scene
{
    preload ()
    {
        this.load.pack('pack', 'assets/pack.json');
    }

    create ()
    {
        this.add.image(0, 0, 'classroom').setOrigin(0);

        var rect = this.add.rectangle(0, 0, 0, 0).setOrigin(0).setStrokeStyle(5, 0xff0000);

        var camera = this.cameras.main;
        this.scale.on('resize', function (gameSize, baseSize, displaySize, previousWidth, previousHeight) {
            var prevCenterX = camera.scrollX + (previousWidth / 2)
            var prevCenterY = camera.scrollY + (previousHeight / 2)
            camera.centerOn(prevCenterX, prevCenterY)
            console.log(prevCenterX, prevCenterY)

            // Get viewport after setting camera
            var viewport = this.scale.getViewPort(camera);
            rect
                .setPosition(viewport.x, viewport.y)
                .setSize(viewport.width, viewport.height)
        }, this);

        camera.centerOn(400, 300);
        camera.setZoom(0.7)
        console.log(camera.scrollX, camera.scrollY)
    }
    update ()
    {
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 600,
    height: 800,
    scale: {
        mode: Phaser.Scale.EXPAND,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Test
};

const game = new Phaser.Game(config);