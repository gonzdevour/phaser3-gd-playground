import loki from 'lokijs/src/lokijs.js';
import Papa from 'papaparse';
import Characters from "./characters/Characters";
import ParseBopomofo from './bopomofo/ParseBopomofo.js';
import LZString from '../../../plugins/lzstring.js'

const GetValue = Phaser.Utils.Objects.GetValue;

class Model {
    constructor(config) {
        this.db = new loki();
        this.characters = new Characters(this);

        var compress = GetValue(config, 'compress', false);
        if (compress) {
            this.lzString = new LZString();
        } else {
            this.lzString = null;
        }


        var charactersCSV = GetValue(config, 'characters');
        if (charactersCSV) {
            this.loadCharactersCSV(charactersCSV);
        }
    }

    loadCharactersCSV(csvString) {
        var data = Papa.parse(csvString, {
            header: true
        }).data;

        var items = [];
        for (var i = 0, icnt = data.length; i < icnt; i++) {
            var line = data[i];
            var character = line.character;
            var bopomofoList = line.bopomofo.split('|');
            for (var j = 0, jcnt = bopomofoList.length; j < jcnt; j++) {
                var characterData = ParseBopomofo(bopomofoList[j]);
                characterData.character = character;
                items.push(characterData);
            }
        }
        this.characters.load(items);
        return this;
    }

    queryCharacter(character) {
        return this.characters.queryCharacter(character);
    }

    dbToString() {
        var s = this.db.serialize();
        if (this.lzString) {
            s = this.lzString.compress(s);
        }
        return s;
    }

    stringToDB(s) {
        if (this.lzString) {
            s = this.lzString.decompress(s);
        }
        this.db.loadJSON(s);
        return this;
    }
}

export default Model;