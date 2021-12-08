import Word from './Word.js';

const GetRandomItem = Phaser.Utils.Array.GetRandom;

var Query = function (dbWrap, filter) {
    var wordCollection = dbWrap.wordCollection;//從wordCollection裡取值
    var docArray = wordCollection.find(filter);
    var words = [];
    for (var i = 0, cnt = docArray.length; i < cnt; i++) {
        words.push(new Word(dbWrap, docArray[i]))
    }
    return words;
}

var QueryWord = function (dbWrap, word) {
    return Query(dbWrap, { word: word });
}

var QueryRandomWord = function (dbWrap) {
    var wordCollection = dbWrap.wordCollection;//從wordCollection裡取值
    var docArray = wordCollection.data();
    return new Word(dbWrap, GetRandomItem(docArray));
}

var QueryByID = function (dbWrap, id) {
    var wordCollection = dbWrap.wordCollection;//從wordCollection裡取值
    var doc = wordCollection.get(id);
    return new Word(dbWrap, doc);
}

export {
    Query, QueryWord, QueryRandomWord,
    QueryByID
};