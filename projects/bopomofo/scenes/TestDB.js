import 'phaser';
import Papa from 'papaparse';
import loki from 'lokijs/src/lokijs.js';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })

    }

    preload() {
        // Load csv file
        this.load.text('characters', 'assets/data/characters.csv');
    }

    create() {
        // Get csv string
        var csvString = this.cache.text.get('characters');
        // Parse csv string to json array
        var characters = Papa.parse(csvString, {
            header: true
        }).data;
        console.log(characters);

        // Create db
        var db = new loki();
        // Add collection
        var collection = db.addCollection('characters');
        // Add document
        for (var i = 0, cnt = characters.length; i < cnt; i++) {
            collection.insert(characters[i]);
        }
        // Query character = '的'
        var docArray = collection.find({ character: '的' });
        console.log(docArray);  // Will get 2 items
    }

    update() { }
}

export default Test;