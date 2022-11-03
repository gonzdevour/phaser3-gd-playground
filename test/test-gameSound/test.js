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
        this.add.text(100,100,'scene test1', {fontSize:24})
        this.input.on('pointerup', function(){
            this.scene.start('test2');
        },this)

        this.input.on('wheel', function(){
            //this.game.sound.play('jungle');
            this.sound.play('jungle')
        },this)
    }
    update() { }
}

class Test2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'test2'
        })
    }
    preload() {
    }
    create() {
        this.add.text(100,100,'scene test2', {fontSize:24})
        this.input.on('pointerup', function(){
            this.scene.start('test1');
        },this)

        this.input.on('wheel', function(){
            this.game.sound.play('right');
        },this)
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
    scene: [Test1, Test2]
};

var game = new Phaser.Game(config);