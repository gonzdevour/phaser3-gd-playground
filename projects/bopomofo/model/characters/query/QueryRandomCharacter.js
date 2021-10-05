import Character from '../Character.js';

const GetRandomItem = Phaser.Utils.Array.GetRandom;
var QueryRandomCharacter = function (model) {
    var characterCollection = model.characterCollection;
    var docArray = characterCollection.data();
    return new Character(model, GetRandomItem(docArray));
}

export default QueryRandomCharacter;