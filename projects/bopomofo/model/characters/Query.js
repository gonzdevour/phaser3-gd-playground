import Character from './Character.js';

var QueryCharacter = function (db, collection, character) {
    var filter = {
        character: character
    }
    var docArray = collection.find(filter).data();
    return docArray.map(function (doc) { return new Character(db, doc) });
}

const GetRandomItem = Phaser.Utils.Array.GetRandom;
var QueryRandomCharacter = function (db, collection) {
    var docArray = collection.chain().data();
    return new Character(db, GetRandomItem(docArray));
}

export { QueryCharacter, QueryRandomCharacter };