import { CharactersCollectionName } from '../prebuilddb/Const.js';
import { QueryCharacter, QueryRandomCharacter } from './Query.js';

class Characters {
    constructor(parent) {
        this.parent = parent;
        this.db = parent.db;
    }

    get collection() {
        // Reference of collection might be changed after deserializing
        return this.db.getCollection(CharactersCollectionName);
    }

    queryCharacter(character) {
        return QueryCharacter(this.db, this.collection, character);
    }

    queryRandomCharacter() {
        return QueryRandomCharacter(this.db, this.collection);
    }
}

export default Characters;