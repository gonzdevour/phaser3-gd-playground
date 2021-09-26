import { saveAs } from 'file-saver';

export default {
    // For editor, to save result
    saveDB(callback) {
        this.db.saveDatabase(callback);
        return this;
    },

    // For editor, to load result
    loadDB(callback) {
        this.db.loadDatabase({}, callback);
        return this;
    },

    // For editor, to dump result
    saveDBToFile(fileName, compress) {
        if (fileName === undefined) {
            fileName = 'bopomofo.db';
        }
        if (compress === undefined) {
            compress = true;
        }
        var blob = new Blob([this.dbToString(compress)], { type: "text/plain;charset=utf-8" });
        saveAs(blob, fileName);
        return this;
    },
}