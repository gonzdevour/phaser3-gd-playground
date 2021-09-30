import { Serialize, Deserialize } from '../../../../phaser3-rex-notes/plugins/utils/lokijs/SerializeMethods.js';
import { CompressionMode, DecompressionMode } from './prebuilddb/Const.js';

var DBToString = function (db, compress) {
    if ((compress === undefined) || (compress === true)) {
        compress = CompressionMode;
    }
    return Serialize(db, compress);
}

var StringToDB = function (db, s, decompress) {
    if ((decompress === undefined) || (decompress === true)) {
        decompress = DecompressionMode;
    }
    Deserialize(db, s, decompress);
}

export { DBToString, StringToDB };