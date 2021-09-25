import Papa from 'papaparse';
import ParseBopomofo from './bopomofo/ParseBopomofo.js';

var LoadCharactersCSV = function (csvString) {
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

export default LoadCharactersCSV;