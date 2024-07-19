import 'phaser/src/phaser';
import AllPlugins from "gdkPlugins/AllPlugins.js";

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })
    }

    preload() {
        this.load.pack('pack', 'assets/pack.json');
    }

    create() {

        //gdsystem的功能包含：
        //
        //@onSceneStartStop
        //- camToCenterOn：RWD時將cam移到正確的位置
        //- layerManager
        //- viewport：RWD相容的viewport和顯示viewport用的vpRect
        //- clickArea：一個可點擊的fullWindowRectangle，用來取得pointerup.none事件，撈"沒點到其他物件的狀況"
        //
        //@plugin
        //- gd.add.自訂物件
        //
        //@myMethods
        //- 注入MyMethods

        var scene = this;
        var viewport = scene.viewport;

        //scene.clickArea.tint = 0xff0000;
        //scene.clickArea.alpha = 0.2;
        scene.vpRect.setStrokeStyle(10, 0x0000ff, 1)

        var txtLabel = scene.gd.add.textLabel('AABB', {layerName:"ui", vpxOffset:20, vpyOffset:20, originX:0, originY:0})

        scene.add.text(600, 200, 'Restart')
            .setInteractive()
            .once('pointerup', function () {
                console.log('Test gd plugin restart')
                scene.scene.restart()
            })

        scene.input.on('pointerup.none', function(){
            console.log('pointerup on nothing')
        })

        var bg = scene.add.image(0, 0, 'classroom')
        ._locate({layerName:"bg", vpx:0.5, vpy:0.5})
        //._locate({layerName:"bg", vpxOffset: viewport.centerX, vpyOffset: viewport.centerY,})
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: Test,
    plugins: AllPlugins,
    scale: {
        mode: Phaser.Scale.EXPAND,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    dom: {
        createContainer: true
    },
};

var game = new Phaser.Game(config);