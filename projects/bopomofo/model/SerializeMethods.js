import { Serialize, Deserialize } from '../../../../phaser3-rex-notes/plugins/utils/lokijs/SerializeMethods.js';

export default {
    dbToString(compress) {
        if (compress === undefined) {
            compress = true;
        }
        return Serialize(this.db, compress);
    },

    stringToDB(s, decompress) {
        if (decompress === undefined) {
            decompress = true;
        }
        Deserialize(this.db, s, decompress);
        return this;
    }
}