import { QueryWord, QueryRandomWord, QueryByID } from './Query.js';

class Words { //從dbWrap建立words db的查詢methods
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