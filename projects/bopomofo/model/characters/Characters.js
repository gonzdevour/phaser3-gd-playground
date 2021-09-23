import DB from '../db/DB.js';
import Papa from 'papaparse';

class Characters {
    constructor() {
        this.collection = DB.addCollection('characters');
    }

    loadCSV(csvString) {
        var data = Papa.parse(csvString, {
            header: true
        }).data;

        var collection = this.collection;
        for (var i = 0, cnt = data.length; i < cnt; i++) {
            collection.insert(data[i]);
        }

        return this;
    }

    queryCharacter(character) {
        return this.collection.find({ character: character });
    }
}

export default Characters;