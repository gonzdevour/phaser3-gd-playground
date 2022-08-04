import 'phaser';
import dat from '../../plugins/datGUI/dat.js';
import fxWarp from '../../../phaser3-rex-notes/plugins/warppipelinecontroller'; 

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
        //light.color.setTo(255, 255, 255);//#ffd900
        var logo = this.add.image(400,300,'logo');
        var gameObject = this.add.image(400,600,'fire').setOrigin(0.5,1).setBlendMode(Phaser.BlendModes.ADD);
        var postFxPipeline = new fxWarp(gameObject, {
            frequencyX: 25,
            frequencyY: 25,
            amplitudeX: 3,
            amplitudeY: 10,
        });
        this.tweens.add({
            targets: postFxPipeline,
            progress: 1,
            repeat: -1,
            yoyo: false,
            duration: 1000,
        })

        var gui = new dat.GUI();
        gui.add(postFxPipeline, 'frequencyX', 0, 100);
        gui.add(postFxPipeline, 'frequencyY', 0, 100);
        gui.add(postFxPipeline, 'amplitudeX', 0, 100);
        gui.add(postFxPipeline, 'amplitudeY', 0, 100);
        gui.add(postFxPipeline, 'progressX', 0, 1);
        gui.add(postFxPipeline, 'progressY', 0, 1);
        gui.add(postFxPipeline, 'progress', 0, 1);
    }
    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Test
};

var game = new Phaser.Game(config);