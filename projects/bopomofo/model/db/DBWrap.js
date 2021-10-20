import CreateDB from './CreateDB.js';
import { StringToDB } from '../SerializeMethods.js';
import { GetWordCollection, GetCharacterCollection } from './GetCollectionMethods.js';
import Words from './words/Words.js';
import Characters from './characters/Characters.js';

class DBWrap {
    constructor(model, json) {
        this.model = model
        this.db = CreateDB();
        if (json) {
            StringToDB(this.db, json);
        }

        // Note: db won't be deserialized later, thus reference of collection won't change.
        this.wordCollection = GetWordCollection(this.db);
        this.characterCollection = GetCharacterCollection(this.db);

        this.words = new Words(this);
        this.characters = new Characters(this);
    }
}

export default DBWrap;