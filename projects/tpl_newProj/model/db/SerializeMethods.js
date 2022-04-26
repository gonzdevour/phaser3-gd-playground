import { Serialize, Deserialize } from '../../../../../phaser3-rex-notes/plugins/utils/lokijs/SerializeMethods.js';
import { CompressionMode, DecompressionMode } from '../prebuilddb/Const.js';

var DBToString = function (db, compress) {
    if ((compress === undefined) || (compress === true)) {
        compress = CompressionMode;
    }
    return Serialize(db, compress); //指定compressionMode將db序列化
}

var StringToDB = function (db, s, decompress) {
    if ((decompress === undefined) || (decompress === true)) {
        decompress = DecompressionMode;
    }
    Deserialize(db, s, decompress); //指定decompressionMode將db解譯回來
}

export { DBToString, StringToDB };