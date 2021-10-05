import {
    Query, QueryCharacter, QueryRandomCharacter,
    QueryByBopomofo,
    QueryByID
} from './query/index.js';


class Characters {
    constructor(model) {
        this.model = model;
    }

    queryCharacter(character) {
        return QueryCharacter(this.model, character);
    }

    queryRandomCharacter() {
        return QueryRandomCharacter(this.model);
    }

    queryByID(id) {
        return QueryByID(this.model, id);
    }

    queryByBopomofo(bopomofo) {
        return QueryByBopomofo(this.model, bopomofo);
    }

    getAll(sortMode) {
        return Query(this.model, {}, sortMode);
    }
}

export default Characters;