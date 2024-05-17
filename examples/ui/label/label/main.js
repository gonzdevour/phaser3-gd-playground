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
        this.input.setDefaultCursor('url(assets/image/finger.png), pointer'); //自訂鼠標圖示

        var label = scene.rexUI.add.label({ //測試sizer內建的所有輸入操作
            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0x339933).setStrokeStyle(2, 0xffffff),
            text: scene.rexUI.add.BBCodeText(0, 0, "text", { fontSize: 36 }),
            //icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
            align: "center",
            space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10}
        })
        .layout()
        .setPosition(100,200)
        .onClick(function(button, gameObject, pointer, event) {
            console.log(`label onClick`)
        },scene)
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