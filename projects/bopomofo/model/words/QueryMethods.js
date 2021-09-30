import Word from './Word.js';

const GetRandomItem = Phaser.Utils.Array.GetRandom;

export default {
    query(filter) {
        var docArray = this.collection.find(filter).data();
        var db = this.db;
        return docArray.map(function (doc) { return new Word(db, doc) });
    },

    queryWord(word) {
        return this.query({
            word: word
        });
    },

    queryRandomWord() {
        var docArray = this.collection.chain().data();
        return new Word(this.db, GetRandomItem(docArray));
    }
}