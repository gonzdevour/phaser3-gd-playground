const CollectionName = 'characters';

class Characters {
    constructor(parent) {
        this.db = parent.db;
    }

    get collection() {
        // Reference of collection might be changed after deserializing
        var collection = this.db.getCollection(CollectionName);
        if (!collection) {
            collection = this.db.addCollection(CollectionName, {
                indices: ['character']
            })
        }
        return collection;
    }

    load(items) {
        this.collection.insert(items);
        return this;
    }

    queryCharacter(character) {
        return this.collection.find({ character: character });
    }
}

export default Characters;