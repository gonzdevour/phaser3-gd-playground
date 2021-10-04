import Word from './Word.js';

const GetRandomItem = Phaser.Utils.Array.GetRandom;

var Query = function (model, filter) {
    var wordCollection = model.wordCollection;
    var docArray = wordCollection.chain().find(filter).data();
    var words = [];
    for (var i = 0, cnt = docArray.length; i < cnt; i++) {
        words.push(new Word(model, docArray[i]))
    }
    return words;
}

var QueryWord = function (model, word) {
    return Query(model, { word: word });
}

var QueryRandomWord = function (model) {
    var wordCollection = model.wordCollection;
    var docArray = wordCollection.chain().data();
    return new Word(model, GetRandomItem(docArray));
}

export { Query, QueryWord, QueryRandomWord };