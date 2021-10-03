import { CharactersCollectionName } from '../prebuilddb/Const.js';
import { Query, QueryCharacter, QueryRandomCharacter } from './Query.js';

class Characters {
    constructor(parent) {
        this.parent = parent;
        this.db = parent.db;
        this.collection = this.db.getCollection(CharactersCollectionName);
        // Note: db won't be deserialized, thus reference of collection won't change.
    }

    queryCharacter(character) {
        return QueryCharacter(this.db, this.collection, character);
    }

    queryRandomCharacter() {
        return QueryRandomCharacter(this.db, this.collection);
    }

    getAll() {
        return Query(this.db, this.collection);
    }
}

export default Characters;