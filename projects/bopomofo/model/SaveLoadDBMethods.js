export default {
    saveDB(callback) {
        this.db.saveDatabase(callback);
        return this;
    },

    loadDB(callback) {
        this.db.loadDatabase({}, callback);
        return this;
    }
}