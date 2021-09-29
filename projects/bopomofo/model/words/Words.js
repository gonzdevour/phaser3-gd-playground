import { WordsCollectionName } from '../prebuilddb/Const.js';
import QueryMethods from './QueryMethods.js';

class Words {
    constructor(parent) {
        this.parent = parent;
        this.db = parent.db;
    }

    get collection() {
        // Reference of collection might be changed after deserializing
        return this.db.getCollection(WordsCollectionName);
    }
}

Object.assign(
    Words.prototype,
    QueryMethods
);
export default Words;