import { QueryWord, QueryRandomWord, QueryByID } from './Query.js';

class Words {
    constructor(dbWrap) {
        this.dbWrap = dbWrap;
    }

    queryWord(word) {
        return QueryWord(this.dbWrap, word);
    }

    queryRandomWord() {
        return QueryRandomWord(this.dbWrap);
    }

    queryByID(id) {
        return QueryByID(this.dbWrap, id);
    }
}

export default Words;