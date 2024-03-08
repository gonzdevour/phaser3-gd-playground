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
        var csvString = `name,hp,mp,friends
Rex,100,20,[gd,Alice]
Alice,300,40,[gd]
gd,150,40,[Rex]`;

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

        var qNotEqual = collection.find({hp: {'$ne': 100}});
        console.log(`--hp not equal 100--`)
        console.log(qNotEqual)

        var qGreaterThan = collection.find({hp: {'$gt': 100}});
        console.log(`--hp greater than 100--`)
        console.log(qGreaterThan)

        var qGreaterThanOrEqualTo = collection.find({hp: {'$gte': 100}});
        console.log(`--hp greater than or equal to 100--`)
        console.log(qGreaterThanOrEqualTo)

        var qLessThan = collection.find({hp: {'$lt': 200}});
        console.log(`--hp less than 200--`)
        console.log(qLessThan)

        var qLessThanOrEqualTo = collection.find({hp: {'$lte': 100}});
        console.log(`--hp less than or equal to 100--`)
        console.log(qLessThanOrEqualTo)   

        var qBetween = collection.find({hp: {'$between': [100,300]}});//會包含100和300
        console.log(`--hp between 100 & 300--`)
        console.log(qBetween)

        var qIn = collection.find({name: {'$in': ["Rex", "gd"]}});
        console.log(`--name in the list: "Rex" & "gd"--`)
        console.log(qIn)

        var qNotIn = collection.find({name: {'$nin': ["Rex", "gd"]}});
        console.log(`--name not in the list: "Rex" & "gd"--`)
        console.log(qNotIn)

        var qContains = collection.find({friends: {'$contains': "gd"}});
        console.log(`--friends array contains "gd"--`)
        console.log(qContains)

        var qContainsAny = collection.find({friends: {'$containsAny': ["Alice", "Rex"]}});
        console.log(`--friends array contains any ["Alice", "Rex"]--`)
        console.log(qContainsAny)

        var qContainsNone = collection.find({friends: {'$containsNone': ["Alice", "Rex"]}});
        console.log(`--friends array contains none ["Alice", "Rex"]--`)
        console.log(qContainsNone)







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