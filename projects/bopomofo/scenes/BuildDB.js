import 'phaser';
import PrebuildDB from '../model/prebuilddb/PrebuildDB';
import DBToFile from '../model/prebuilddb/DBToFile';

class BuildDB extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })

    }

    preload() {
        // Load csv file
        this.load.text('words', '/assets/data/words.csv');
    }

    create() {
        var db = PrebuildDB(this.cache.text.get('words'))
        DBToFile(db, 'bopomofo.json', false);
        DBToFile(db, 'bopomofo.c', true);
    }

    update() { }
}

export default BuildDB;