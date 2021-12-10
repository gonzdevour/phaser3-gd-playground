//取得loki.js的Serialize function
import { Serialize } from '../../../../../phaser3-rex-notes/plugins/utils/lokijs/SerializeMethods.js';
import { saveAs } from 'file-saver';

//var aBlob = new Blob( array, options );
//blob是utf-8混合陣列，可設定MIME-type如text/html
//是file的預備資料

var DBToFile = function (db, fileName, compress) {
    var blob = new Blob([Serialize(db, compress)], { type: "text/plain;charset=utf-8" });
    saveAs(blob, fileName);
}

export default DBToFile;