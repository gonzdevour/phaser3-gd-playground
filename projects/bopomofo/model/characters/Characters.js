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

    queryCharacter(character, index) {
        var filterConfig = {
            character: character
        };

        if (index !== undefined) {
            filterConfig.index = index;
        }

        return this.collection.find(filterConfig);
    }

    getCharacterPage(pageIndex, pageSize) {
        return this.collection.chain().offset(pageIndex * pageSize).limit(pageSize).data();
    }
}

export default Characters;