import loki from 'lokijs/src/lokijs.js';
import Characters from "./characters/Characters";
import Methods from './Methods';

const GetValue = Phaser.Utils.Objects.GetValue;

class Model {
    constructor(config) {
        this.db = new loki('bopomofo.db', {
            env: 'BROWSER'
        });
        this.characters = new Characters(this);

        // Initial database
        var deserializeString = GetValue(config, 'db');
        if (deserializeString) {
            this.stringToDB(deserializeString);
        }
    }
}

Object.assign(
    Model.prototype,
    Methods
);

export default Model;