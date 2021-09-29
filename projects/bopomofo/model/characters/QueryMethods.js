import Character from './Character.js';

const GetRandomItem = Phaser.Utils.Array.GetRandom;

export default {
    queryCharacter(character) {
        var filterConfig = {
            character: character
        };
        var docArray = this.collection.find(filterConfig).data();
        var db = this.db;
        return docArray.map(function (doc) { return new Character(db, doc) });
    },

    queryRandomCharacter() {
        var docArray = this.collection.chain().data();
        return new Character(this.db, GetRandomItem(docArray));
    }

}