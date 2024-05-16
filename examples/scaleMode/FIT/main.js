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
        var scene = this;
        var viewport = scene.scale.getViewPort();
        var camera = this.cameras.main;
        camera.setBackgroundColor('#66ccff');
        //camera.scrollX = 500
    
        var dragScale = scene.rexGestures.add.pinch(scene);
        dragScale
            .on('drag1', function (dragScale) {
                var drag1Vector = dragScale.drag1Vector;
                camera.scrollX -= drag1Vector.x / camera.zoom;
                camera.scrollY -= drag1Vector.y / camera.zoom;
            })
            .on('pinch', function (dragScale) {
                var scaleFactor = dragScale.scaleFactor;
                camera.zoom *= scaleFactor;
            }, scene)

        for (let index = 0; index < 20; index++) {
            var randomSize = Math.random() * (0.5 - 0.1) + 0.1; //取得0.1~0.5之間的浮點數
            var randomX = Math.random() * viewport.width;
            var randomY = Math.random() * viewport.height;
            scene.add.image(randomX, randomY, 'right').setScale(randomSize); //模擬物件 
        }
        scene.rexUI.add.roundRectangle(100, 80, 100, 100, 0, 0x008888).setScrollFactor(0,0); //模擬UI
    }
    update ()
    {
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