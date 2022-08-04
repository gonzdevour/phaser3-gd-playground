import 'phaser';
import dat from '../../plugins/datGUI/dat.js';

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
        let light = this.add.pointlight(400, 300, 0xffd900, 40, 0.25);
        //light.color.setTo(255, 255, 255);//#ffd900

        var gui = new dat.GUI();
        gui.add(light, 'radius',0, 100);
        gui.add(light, 'intensity',0,1,0.01);
        //gui.add(light, 'attenuation', 0, 1);
        gui.add(light.color, 'red', 0, 255);
        gui.add(light.color, 'green', 0, 255);
        gui.add(light.color, 'blue', 0, 255);
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