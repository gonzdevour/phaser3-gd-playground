import 'phaser';
import PrebuildDB from './build/PreBuildDB.js';

class BuildDB extends Phaser.Scene {
    constructor() {
        super({
            key: 'pre-build-db'
        })

    }

    preload() {
        // Load csv file
        this.load.text('words', 'assets/words.csv');
    }

    create() {
        PrebuildDB({
            csv: this.cache.text.get('words'),
            // fileName: 'bopomofo'
        })
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
    scene: BuildDB
};

var game = new Phaser.Game(config);