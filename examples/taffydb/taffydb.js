import phaser from 'phaser/src/phaser.js';
import tfdb from '../../plugins/taffydb/taffy-min.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        console.log('hello phaser');
        var products = tfdb.taffy([
            { "item"  : 1,
              "name"  : "Blue Ray Player",
              "price" : 99.99
            },
            { "item"  : 2,
              "name"  : "3D TV",
              "price" : 1799.99
            }
          ]);
        // where item is equal to 1
        for(var i = 0; i< products({item:1}).count(); i++){
            console.log(products().get()[i]['name']);
        }

        // where price is less than 100
        var lowPricedItems = products({price:{lt:100}});
        // where name is like "Blue Ray"
        var blueRayPlayers = products({name:{like:"Blue Ray"}});

        // get first record
        var item1 = products().first();
        // get last record
        var item2 = products().last();

        console.log(item1);
        console.log(item2);
    }
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
    scene: Demo,
};

var game = new Phaser.Game(config);