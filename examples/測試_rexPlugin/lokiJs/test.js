import phaser from 'phaser/src/phaser.js';
import Papa from 'papaparse/papaparse.js';
import loki from 'lokijs/src/lokijs.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var csvString = `name,hp,mp
Rex,100,20
Alice,300,40
gd,100,40`;

        var csvTable = Papa.parse(csvString, {
            dynamicTyping: true,
            header: true
        }).data;

        // Create the database
        var db = new loki();

        // Create a collection
        var collection = db.addCollection('collection');

        // insert csv-table
        collection.insert(csvTable);

        var result = collection.chain().data();

        console.log(`--db--`)
        console.log(result);

        console.log(`--id: 2--`)
        var qByID = collection.get(2)

        console.log(qByID)

        var qByUniqueKeyValue = collection.by("name", "gd")
        console.log(`--unique name "gd"--`)
        console.log(qByUniqueKeyValue)

        var qEqual = collection.find({hp: {'$eq': 100}})
        console.log(`--hp equal 100--`)
        console.log(qEqual)

        var qAbstractEqual = collection.find({hp: {'$aeq': "100"}});
        console.log(`--hp abstract equal "100"--`)
        console.log(qAbstractEqual)

        
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);