import { Serialize } from '../../../../../phaser3-rex-notes/plugins/utils/lokijs/SerializeMethods.js';
import { saveAs } from 'file-saver';

var DBToFile = function (db, fileName, compress) {
    var blob = new Blob([Serialize(db, compress)], { type: "text/plain;charset=utf-8" });
    saveAs(blob, fileName);
}

export default DBToFile;