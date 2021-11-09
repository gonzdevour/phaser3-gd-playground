import 'phaser';
import InitLog from '../../plugins/logger/InitLog.js';
import rexScaleOuter from '../../plugins/scaleouter/scaleouter.js';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })
        InitLog({
            width: '300px', height: '300px',
            backgroundColor: 'Navy'
        })
    }

    preload() {
        log('preload')
    }

    create() {
        log('create')
        for(var i=0; i<1000; i++) {
            log(i)
        }

        this.input.on('pointerup', function(){
            logger.toggleVisible();
        })
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 768,
    height: 1334,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: rexScaleOuter,
    scene: Test
};

var game = new Phaser.Game(config);