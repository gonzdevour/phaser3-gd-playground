import Character from './Character.js';

var Query = function (db, collection, filter) {
    var docArray = collection.chain().find(filter).data();
    var characters = [];
    for (var i = 0, cnt = docArray.length; i < cnt; i++) {
        characters.push(new Character(db, docArray[i]))
    }
    return characters;
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