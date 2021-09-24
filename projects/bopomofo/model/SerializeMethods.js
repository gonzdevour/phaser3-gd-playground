import LZString from '../../../plugins/lzstring.js';

export default {
    dbToString() {
        return LZString.compress(this.db.serialize());
    },

    stringToDB(s) {
        this.db.loadJSON(LZString.decompress(s));
        return this;
    }
}