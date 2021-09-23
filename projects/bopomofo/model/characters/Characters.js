import DB from '../db/DB.js';

class Characters {
    constructor() {
        this.collection = DB.addCollection('characters');
    }

    load(items) {
        var collection = this.collection;
        for (var i = 0, cnt = items.length; i < cnt; i++) {
            collection.insert(items[i]);
        }

        return this;
    }

    queryCharacter(character) {
        return this.collection.find({ character: character });
    }
}

export default Characters;