import Character from '../Character.js';

const GetRandomItem = Phaser.Utils.Array.GetRandom;
var QueryRandomCharacter = function (dbWrap) {
    var characterCollection = dbWrap.characterCollection;
    var docArray = characterCollection.data();
    return new Character(dbWrap, GetRandomItem(docArray));
}

export default QueryRandomCharacter;