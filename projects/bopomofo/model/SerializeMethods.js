import { Serialize, Deserialize } from '../../../../phaser3-rex-notes/plugins/utils/lokijs/SerializeMethods.js';
import { CompressionMode, DecompressionMode } from './prebuilddb/Const.js'

export default {
    dbToString(compress) {
        if ((compress === undefined) || (compress === true)) {
            compress = CompressionMode;
        }
        return Serialize(this.db, compress);
    },

    stringToDB(s, decompress) {
        if ((decompress === undefined) || (decompress === true)) {
            decompress = DecompressionMode;
        }
        Deserialize(this.db, s, decompress);
        return this;
    }
}