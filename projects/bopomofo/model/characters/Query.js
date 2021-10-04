import Character from './Character.js';

var Query = function (model, filter) {
    var characterCollection = model.characterCollection;
    var docArray = characterCollection.find(filter).data();
    var characters = [];
    for (var i = 0, cnt = docArray.length; i < cnt; i++) {
        characters.push(new Character(model, docArray[i]))
    }
    return characters;
}
var QueryCharacter = function (model, character) {
    return Query(model, { character: character });
}

const GetRandomItem = Phaser.Utils.Array.GetRandom;
var QueryRandomCharacter = function (model) {
    var characterCollection = model.characterCollection;
    var docArray = characterCollection.chain().data();
    return new Character(model, GetRandomItem(docArray));
}

export { Query, QueryCharacter, QueryRandomCharacter };