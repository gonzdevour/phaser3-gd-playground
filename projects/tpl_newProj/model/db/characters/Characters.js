import {
    Query, QueryCharacter, QueryRandomCharacter,
    QueryByBopomofo,
    QueryByID
} from './query/index.js';


class Characters { //從dbWrap建立characters db的查詢methods
    constructor(dbWrap) {
        this.dbWrap = dbWrap;
    }

    query(filter, sortMode) {
        return Query(this.dbWrap, filter, sortMode);
    }

    queryCharacter(character) { //傳入character字串
        return QueryCharacter(this.dbWrap, character);
    }

    queryRandomCharacter() {
        return QueryRandomCharacter(this.dbWrap);
    }

    queryByID(id) {
        return QueryByID(this.dbWrap, id);
    }

    queryByBopomofo(bopomofo) {
        return QueryByBopomofo(this.dbWrap, bopomofo);
    }

    getAll(sortMode) {
        return Query(this.dbWrap, {}, sortMode);
    }
}

export default Characters;