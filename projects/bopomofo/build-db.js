import 'phaser';
import PrebuildDB from './build/prebuilddb/PreBuildDB.js';

class BuildDB extends Phaser.Scene {
    constructor() {
        super({
            key: 'pre-build-db'
        })

    }

    preload() {
        // Load csv file
        this.load.text('db0', 'assets/db0.csv');
        this.load.text('db1', 'assets/db1.csv');
    }

    create() {
        PrebuildDB({
            csv: this.cache.text.get('db0'),
            fileName: 'db0'
        })
        PrebuildDB({
            csv: this.cache.text.get('db1'),
            fileName: 'db1'
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