import Word from './Word.js';

const GetRandomItem = Phaser.Utils.Array.GetRandom;

var Query = function (db, collection, filter) {
    var docArray = collection.chain().find(filter).data();
    var words = [];
    for (var i = 0, cnt = docArray.length; i < cnt; i++) {
        words.push(new Word(db, docArray[i]))
    }
    return words;
}

var QueryWord = function (db, collection, word) {
    return Query(db, collection, { word: word });
}

var QueryRandomWord = function (db, collection) {
    var docArray = collection.chain().data();
    return new Word(db, GetRandomItem(docArray));
}

export { Query, QueryWord, QueryRandomWord };