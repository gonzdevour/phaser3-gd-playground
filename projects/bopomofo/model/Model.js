import loki from 'lokijs/src/lokijs.js';
import Papa from 'papaparse';
import Characters from "./characters/Characters";
import ParseBopomofo from './bopomofo/ParseBopomofo.js';
import Methods from './Methods';

const GetValue = Phaser.Utils.Objects.GetValue;

class Model {
    constructor(config) {
        this.db = new loki();
        this.characters = new Characters(this);

        // Initial database
        var deserializeString = GetValue(config, 'db');
        if (deserializeString) {
            this.stringToDB(deserializeString);
        } else {
            var charactersCSV = GetValue(config, 'characters');
            if (charactersCSV) {
                this.loadCharactersCSV(charactersCSV);
            }
        }
    }

    loadCharactersCSV(csvString) {
        var data = Papa.parse(csvString, {
            header: true
        }).data;

        var items = [];
        for (var i = 0, icnt = data.length; i < icnt; i++) {
            var line = data[i];
            var bopomofoList = line.bopomofo.split('|');
            for (var j = 0, jcnt = bopomofoList.length; j < jcnt; j++) {
                var character = ParseBopomofo(bopomofoList[j], { character: line.character });
                items.push(character);
            }
        }
        this.characters.load(items);
        return this;
    }

    queryCharacter(character) {
        return this.characters.queryCharacter(character);
    }

}

Object.assign(
    Model.prototype,
    Methods
);

export default Model;