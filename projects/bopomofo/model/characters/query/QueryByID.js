import Character from '../Character.js';
var QueryByID = function (model, id) {
    var characterCollection = model.characterCollection;
    var doc = characterCollection.get(id);
    return new Character(model, doc);
}

export default QueryByID;