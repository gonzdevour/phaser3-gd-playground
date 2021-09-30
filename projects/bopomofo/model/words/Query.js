import Word from './Word.js';

const GetRandomItem = Phaser.Utils.Array.GetRandom;

var Query = function (db, collection, filter) {
    var docArray = collection.find(filter).data();
    return docArray.map(function (doc) { return new Word(db, doc) });
}

var QueryWord = function (db, collection, word) {
    return Query(db, collection, { word: word });
}

var QueryRandomWord = function (db, collection) {
    var docArray = collection.chain().data();
    return new Word(db, GetRandomItem(docArray));
}

export { Query, QueryWord, QueryRandomWord };