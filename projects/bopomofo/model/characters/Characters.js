class Characters {
    constructor(parent) {       
        this.collection = parent.db.addCollection('characters');
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