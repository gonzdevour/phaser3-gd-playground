import Word from './Word.js';

const GetRandomItem = Phaser.Utils.Array.GetRandom;

export default {
    queryWord(word) {
        var filterConfig = {
            word: word
        };
        var docArray = this.collection.find(filterConfig).data();
        var db = this.db;
        return docArray.map(function (doc) { return new Word(db, doc) });
    },

    queryRandomWord() {
        var docArray = this.collection.chain().data();
        return new Word(this.db, GetRandomItem(docArray));
    }
}