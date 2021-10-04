import { Query, QueryCharacter, QueryRandomCharacter } from './Query.js';

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

    getAll() {
        return Query(this.model);
    }
}

export default Characters;