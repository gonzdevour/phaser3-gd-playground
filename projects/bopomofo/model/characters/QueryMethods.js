import Character from './Character.js';

const GetRandomItem = Phaser.Utils.Array.GetRandom;

export default {
    queryCharacter(character) {
        var filterConfig = {
            character: character
        };
        var docArray = this.collection.find(filterConfig).data();
        return docArray.map(function (doc) { return new Character(doc) });
    },

    queryRandomCharacter() {
        var docArray = this.collection.chain().data();
        return new Character(GetRandomItem(docArray));
    }

}