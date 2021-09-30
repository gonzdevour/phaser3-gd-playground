import Character from './Character.js';

const GetRandomItem = Phaser.Utils.Array.GetRandom;

export default {
    query(filter) {
        var docArray = this.collection.find(filter).data();
        var db = this.db;
        return docArray.map(function (doc) { return new Character(db, doc) });
    },

    queryCharacter(character) {
        return this.query({
            character: character
        });
    },

    queryRandomCharacter() {
        var docArray = this.collection.chain().data();
        return new Character(this.db, GetRandomItem(docArray));
    }

}