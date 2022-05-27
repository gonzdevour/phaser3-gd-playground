import phaser from 'phaser/src/phaser.js';
import tfdb from '../../plugins/taffydb/taffy-min.js';
import Papa from 'papaparse';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {

        //取得csv
        var csvstring = `name,hp,mp,gold
Rex,100,20,100
GD,80,10,30
Alice,300,40,200`

        var csvstring1 = `name,hp,mp,gold
Andy,100,20,100
Rick,80,10,30
Jose,300,40,200`

        //csv轉json array
        var data = csvToJSONArr(csvstring);
        var data1 = csvToJSONArr(csvstring1);
        //taffy建立db(注意db是一個函數，要用db()才會回傳db物件)
        var db = tfdb.taffy(data);
        var db1 = tfdb.taffy(data1);
        db1({name:'Rick'}).update({name:'Green'})
        //get:將obj轉json
        //console.log('db get:' + db().get()[0].name);
        //console.log('db1 get:' + db1().get()[0].name);
        //loop
        print(db, cond, 'hp', 'asc');
        print(db1, cond);

        // where mp is equal to 40
        console.log('where mp is equal to 40')
        var cond = {mp:40};
        print(db, cond);

        // where gold is less than 150
        console.log('where mp<40, hp>80')
        var cond = {mp:{lt:40},hp:{gt:80}}; //大小寫敏感
        print(db, cond);

        // where name is like "Re"
        console.log('where name is like "Re"')
        var cond = {name:{like:"Re"}}; //大小寫敏感
        print(db, cond);

        // get first record
        var item1 = db().first();
        // get last record
        var item2 = db().last();

        console.log(item1);
        console.log(item2);
    }
}

var csvToJSONArr = function(csvstring){
    return Papa.parse(csvstring, { header: true, dynamicTyping: true }).data //.data取出json array
}

var print = function(db, cond, orderBy, asc){
    var sorter = orderBy + ' ' + (asc?'asec':'desc'); //注意升序是asec而非asc或asce
    db(cond).order(sorter).each(function (obj) { //注意order()和sort()不同，sort()會改變db內的順序
        console.log(obj.name);
    });
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