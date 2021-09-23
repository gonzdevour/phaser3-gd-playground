import loki from 'lokijs/src/lokijs.js';
import Papa from 'papaparse';
import Characters from "./characters/Characters";

const GetValue = Phaser.Utils.Objects.GetValue;

class Model {
    constructor(config) {
        this.db = new loki();
        this.characters = new Characters(this);

        var charactersCSV = GetValue(config, 'characters');
        if (charactersCSV) {
            this.loadCharactersCSV(charactersCSV);
        }
    }

    loadCharactersCSV(csvString) {
        var items = Papa.parse(csvString, {
            header: true
        }).data;
        this.characters.load(items);
        return this;
    }

    queryCharacter(character) {
        return this.characters.queryCharacter(character);
    }

}

export default Model;