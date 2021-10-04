import { QueryWord, QueryRandomWord, QueryByID } from './Query.js';

class Words {
    constructor(model) {
        this.model = model;
    }

    queryWord(word) {
        return QueryWord(this.model, word);
    }

    queryRandomWord() {
        return QueryRandomWord(this.model);
    }

    queryByID(id) {
        return QueryByID(this.model, id);
    }
}

export default Words;