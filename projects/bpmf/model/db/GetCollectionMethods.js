import { WordsCollectionName, CharactersCollectionName } from './Const.js';

var GetWordCollection = function (db) {
    return db.getCollection(WordsCollectionName);
}

var GetCharacterCollection = function (db) {
    return db.getCollection(CharactersCollectionName);
}

export {
    GetWordCollection, GetCharacterCollection
}