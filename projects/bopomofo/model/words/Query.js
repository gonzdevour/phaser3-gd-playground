import Word from './Word.js';

const GetRandomItem = Phaser.Utils.Array.GetRandom;

var QueryWord = function (db, collection, word) {
    var filter = {
        word: word
    }
    var docArray = collection.find(filter).data();
    return docArray.map(function (doc) { return new Word(db, doc) });
}

var QueryRandomWord = function (db, collection) {
    var docArray = collection.chain().data();
    return new Word(db, GetRandomItem(docArray));
}

export { QueryWord, QueryRandomWord };