import { Serialize, Deserialize } from '../../../../phaser3-rex-notes/plugins/utils/lokijs/SerializeMethods.js';

export default {
    dbToString() {
        return Serialize(this.db);
    },

    stringToDB(s) {
        Deserialize(this.db, s);
        return this;
    }
}