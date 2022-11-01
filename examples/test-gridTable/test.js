import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';
import CreateTestGridSavePanel from './script/CreateTestGridSavePanel.js';

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
        //this.rexScaleOuter.scale(); //scaleOuter在進入scene時不會自動執行，必須每scene呼叫
        //this.viewport = this.rexScaleOuter.outerViewport; //on resize時scene.viewport不隨之變動
        this.viewport = {centerX: 512, centerY:400, width: 1024, height:800}

        CreateTestGridSavePanel(this);
    }
    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1024,
    height: 800,
    scale: {
        //mode: Phaser.Scale.FIT,
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: [Test1]
};

var game = new Phaser.Game(config);