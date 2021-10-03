import { WordsCollectionName } from '../prebuilddb/Const.js';
import { QueryWord, QueryRandomWord } from './Query.js';

class Words {
    constructor(parent) {
        this.parent = parent;
        this.db = parent.db;
        this.collection = this.db.getCollection(WordsCollectionName);
        // Note: db won't be deserialized, thus reference of collection won't change.
    }

    queryWord(word) {
        return QueryWord(this.db, this.collection, word);
    }

    queryRandomWord() {
        return QueryRandomWord(this.db, this.collection);
    }
}

export default Words;