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
        var camMain = this.cameras.main;
        camMain.setBackgroundColor('#66ccff');
        var camUI = scene.cameras.add();
        //camMain.scrollX = 500
    
        var dragScale = scene.rexGestures.add.pinch(scene);
        dragScale
            .on('drag1', function (dragScale) {
                var drag1Vector = dragScale.drag1Vector;
                camMain.scrollX -= drag1Vector.x / camMain.zoom;
                camMain.scrollY -= drag1Vector.y / camMain.zoom;
            })
            .on('pinch', function (dragScale) {
                var scaleFactor = dragScale.scaleFactor;
                camMain.zoom *= scaleFactor;
            }, scene)
        var zoomRatio = 1;
        scene.input.on('wheel', function(pointer, currentlyOver, dx, dy, dz, event){
            //滾輪向上dy為負值，向下dy為正值
            console.log(`--dx:${dx},dy:${dy},dz:${dz}, `);
            //向上減，向下加
            zoomRatio = Phaser.Math.Clamp(zoomRatio + 0.1*Math.sign(dy), 0.1, 2)
            scene.tweens.add({
                targets: camMain,
                zoom: zoomRatio,
                ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 1000,
                repeat: 0,            // -1: infinity
                yoyo: false,
            });
        },scene)

        for (let index = 0; index < 20; index++) {
            var randomSize = 0.2
            var randomX = Math.random() * viewport.width;
            var randomY = Math.random() * viewport.height;
            var img = scene.add.image(randomX, randomY, 'right').setScale(randomSize); //模擬物件 
            camUI.ignore(img);
        }

        var btn = scene.rexUI.add.roundRectangle(100, 80, 100, 100, 0, 0x008888).setScrollFactor(0,0); //模擬UI
        camMain.ignore(btn);
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