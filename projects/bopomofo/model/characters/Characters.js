import { Query, QueryCharacter, QueryRandomCharacter, QueryByID } from './Query.js';

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

    getAll(sortMode) {
        return Query(this.model, {}, sortMode);
    }
}

export default Characters;