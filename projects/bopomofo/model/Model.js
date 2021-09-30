import loki from 'lokijs/src/lokijs.js';
import Words from './words/Words.js';
import Characters from "./characters/Characters";
import { DBToString, StringToDB } from './SerializeMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Model {
    constructor(config) {
        this.db = new loki('bopomofo.db', {
            env: 'BROWSER'
        });
        this.words = new Words(this);
        this.characters = new Characters(this);

        // Initial database
        var deserializeString = GetValue(config, 'db');
        if (deserializeString) {
            this.stringToDB(deserializeString);
        }
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