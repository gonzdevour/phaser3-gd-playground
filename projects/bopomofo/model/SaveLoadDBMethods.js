import { saveAs } from 'file-saver';

export default {
    saveDB(callback) {
        this.db.saveDatabase(callback);
        return this;
    },

    loadDB(callback) {
        this.db.loadDatabase({}, callback);
        return this;
    },

    saveDBToFile(fileName) {
        if (fileName === undefined) {
            fileName = 'bopomofo.db';
        }
        var blob = new Blob([this.dbToString()], { type: "text/plain;charset=utf-8" });
        saveAs(blob, fileName);
        return this;
    },
}