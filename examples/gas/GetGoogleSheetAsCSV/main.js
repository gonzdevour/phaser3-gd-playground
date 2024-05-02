import 'phaser';
import Papa from 'papaparse/papaparse.js';
import loki from 'lokijs/src/lokijs.js';
import AllPlugins from 'gdkPlugins/AllPlugins.js';

import GetGoogleSheetsAsCSV from 'gdkPlugins/utils/gas/GetGoogleSheetsAsCSV.js';

class Test extends Phaser.Scene
{
    preload ()
    {
        this.load.pack('pack', 'assets/pack.json');
    }

    create ()
    {
        // Create the database
        var db = new loki();
        var collection = {};

        GetGoogleSheetsAsCSV({
            sheetIdArr: ['1W5p1Xyy4usaSeW6VhuZOdUu26ci6E-Rhma__QTlw2Lw'], //可填入複數sheet id
            url: "https://script.google.com/macros/s/AKfycbxB2GPvA1XKl7z-sMeuHsrfhdqgnJrB3Mo6xV04_51lKmj_IeB5RnHNvyM1dZg0hj-LBg/exec",
        }).then(data => {
            console.log('Received data:\n', data);

            var arr = JSON.parse(data);
            console.log(Array.isArray(arr))

            arr.forEach(element => {

                console.log("--element--")
                console.log(element)

                // Create collection by sheet
                collection[element.sheetName] = db.addCollection(element.sheetName,{
                    indices: ["日期編號"], //建立快速索引，例如ID、圖書管的isbn標準碼，find時如果用到indices內的key就會加速
                    unique: "歷史", //指定有唯一性質的欄位，如ID或email(unique key可以用by取得值)
                });

                //csv to array table
                var csvTable = Papa.parse(element.csvData, {
                    dynamicTyping: true,
                    header: true
                }).data;

                // insert csv-table
                collection[element.sheetName].insert(csvTable);

                // 取得日期1949/03/01以前的歷史事件
                console.log(`--日期編號小於19490301--`)
                var qLessThan = collection[element.sheetName].find({日期編號: {'$lt': 19490301}});
                console.log(qLessThan)

            });
        }).catch(error => {
            console.error('Error during gasReq call:\n', error);
        });   
    }
    update ()
    {
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1024,
    height: 800,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Test
};

const game = new Phaser.Game(config);