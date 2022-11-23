import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';

class Test1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'test1'
        })
    }
    preload() {
        this.load.pack('pack', 'assets/pack.json');
    }
    create() {
        var scene = this;
        var portrait = scene.rexUI.add.transitionImage(100, 100, 'ico_no')
        var rect = scene.rexUI.add.roundRectangle(0,0,300,50, 10, 0xff00ff);
        var sizer = scene.rexUI.add.sizer({
            x:200, y:200,
            orientation:'x',
            space: { left: 10, right:50, item: 10},
        })
        .add(portrait)
        .add(rect, {proportion:1, expand:true})
        .layout()
    }
    update() { }
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
    scene: [Test1]
};

var game = new Phaser.Game(config);