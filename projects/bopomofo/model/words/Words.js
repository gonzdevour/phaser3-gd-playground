import { QueryWord, QueryRandomWord } from './Query.js';

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
}

export default Words;