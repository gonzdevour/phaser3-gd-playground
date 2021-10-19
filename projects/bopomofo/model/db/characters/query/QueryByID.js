import Character from '../Character.js';
var QueryByID = function (dbWrap, id) {
    var characterCollection = dbWrap.characterCollection;
    var doc = characterCollection.get(id);
    return new Character(dbWrap, doc);
}

export default QueryByID;