import { Serialize, Deserialize } from '../../../../phaser3-rex-notes/plugins/utils/lokijs/SerializeMethods.js';
import { CompressionMode, DecompressionMode } from './prebuilddb/Const.js'

export default {
    dbToString(compress) {
        if (compress === undefined) {
            compress = true;
        }
        return Serialize(this.db, CompressionMode);
    },

    stringToDB(s, decompress) {
        if (decompress === undefined) {
            decompress = true;
        }
        Deserialize(this.db, s, DecompressionMode);
        return this;
    }
}