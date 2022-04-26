import Query from './Query.js';

var QueryCharacter = function (dbWrap, character) {
    return Query(dbWrap, { character: character });
}

export default QueryCharacter;