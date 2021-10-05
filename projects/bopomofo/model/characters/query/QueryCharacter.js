import Query from './Query.js';

var QueryCharacter = function (model, character) {
    return Query(model, { character: character });
}

export default QueryCharacter;