import phaser from 'phaser/src/phaser.js';
import AllPlugins from '../../plugins/AllPlugins.js';
import CreateChar from './CreateChar.js';
import CreateModelMenu from './CreateModelMenu.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    init() {
        this.rexScaleOuter.scale();
        this.viewport = this.rexScaleOuter.outerViewport; //on resize時this.viewport不隨之變動
        //this.viewport = this.cameras.main;
    }

    preload() {
        this.load.rexLive2dCoreScript('assets/live2d/core/live2dcubismcore.js');
        this.load.rexLive2d('Haru', 'assets/live2d/Haru/Haru.model3.json');
        //load pack
        this.load.pack('pack', 'assets/pack.json');
        this.load.json('pkg', 'https://api.github.com/repos/Eikanya/Live2d-model/git/trees/master')
    }

    create() {
        var _scene = this;

        console.log(JSON.stringify(this.cache.json.get('pkg')));

        //this.input.setDefaultCursor('url(assets/image/yes.png), pointer')
        //建立角色
        this.add.image(100,100,'yes');
        var character = CreateChar(this, 'Haru');

        CreateModelMenu(this);
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 768,
    height: 1334,
    scale: {
        mode: Phaser.Scale.RESIZE, //scaleOuter plugin需要RESIZE mode
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Demo,
};

var game = new Phaser.Game(config);