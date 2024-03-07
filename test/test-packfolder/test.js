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
        this.load.image('woman0', 'assets/image/woman0.jpg');
    }
    create() {
        console.log('packfolder test');
        this.add.image(200,200,'woman0');
        this.add.image(500,300,'woman1');
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
        //mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: [Test1]
};

var game = new Phaser.Game(config);