import CreateDB from './prebuilddb/CreateDB.js';
import { WordsCollectionName, CharactersCollectionName } from './prebuilddb/Const.js';
import Words from './words/Words.js';
import Characters from "./characters/Characters";
import { DBToString, StringToDB } from './SerializeMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Model {
    constructor(config) {
        this.db = CreateDB();

        // Initial database
        var deserializeString = GetValue(config, 'db');
        if (deserializeString) {
            this.stringToDB(deserializeString);
        }

        // Note: db won't be deserialized later, thus reference of collection won't change.
        this.wordCollection = this.db.getCollection(WordsCollectionName);
        this.characterCollection = this.db.getCollection(CharactersCollectionName);

        this.words = new Words(this);
        this.characters = new Characters(this);
    }

    dbToString(compress) {
        return DBToString(this.db, compress);
    }

    stringToDB(s, decompress) {
        StringToDB(this.db, s, decompress);
        return this;
    }
}

export default Model;