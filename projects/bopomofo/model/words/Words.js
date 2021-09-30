import { WordsCollectionName } from '../prebuilddb/Const.js';
import { QueryWord, QueryRandomWord } from './Query.js';

class Words {
    constructor(parent) {
        this.parent = parent;
        this.db = parent.db;
    }

    get collection() {
        // Reference of collection might be changed after deserializing
        return this.db.getCollection(WordsCollectionName);
    }

    queryWord(word) {
        return QueryWord(this.db, this.collection, word);
    }

    queryRandomWord() {
        return QueryRandomWord(this.db, this.collection);
    }
}

export default Words;