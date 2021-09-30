import Character from './Character.js';

var Query = function (db, collection, filter) {
    var docArray = collection.chain().find(filter).data();
    return docArray.map(function (doc) { return new Character(db, doc) });
}
var QueryCharacter = function (db, collection, character) {
    return Query(db, collection, { character: character });
}

const GetRandomItem = Phaser.Utils.Array.GetRandom;
var QueryRandomCharacter = function (db, collection) {
    var docArray = collection.chain().data();
    return new Character(db, GetRandomItem(docArray));
}

export { Query, QueryCharacter, QueryRandomCharacter };