import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';
import ContainerLite from '../../../phaser3-rex-notes/plugins/containerlite.js';
import CreateScenarioViewport from '../test-scenario/scripts/CreateScenarioViewport.js';

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
        this.rexScaleOuter.scale(); //scaleOuter在進入scene時不會自動執行
        this.viewport = this.rexScaleOuter.outerViewport; //on resize時scene.viewport不隨之變動

        var img0 = this.add.image(0,0,'woman0');
        var label = this.rexUI.add.label({
            x:0, y:0,
            background: this.rexUI.add.roundRectangle(0,0,0,0,10,0x339999),
            icon: this.rexUI.add.roundRectangle(0,0,80,80,10,0xff3333),
            text: this.add.text(0, 0, 'Leonardo Dicapio', {fontSize: 48}),
        }).layout()
        var ctnr0 = new ContainerLite(this, 0, 0, undefined, undefined, [img0, label]);

        var viewport = CreateScenarioViewport(this, 600, 100, 800, 600);
        this.plugins.get('rexViewportCoordinate').add(ctnr0, viewport, 0.5, 0.5);

        this.tweens.add({
            targets: ctnr0,
            duration:1000,
            yoyo:true,
            repeat:-1,
            vpy:'-=0.2',
        })
    }
    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1024,
    height: 800,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Test
};

var game = new Phaser.Game(config);