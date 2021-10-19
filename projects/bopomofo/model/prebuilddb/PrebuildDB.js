import CreateDB from "../db/CreateDB";
import CSVToWordDataList from './CSVToWordDataList.js';
import WordDataListToDB from './WordDataListToDB.js'

var PrebuildDB = function (csvStrings) {
    if (typeof (csvStrings) === 'string') {
        csvStrings = [csvStrings];
    }
    var db = CreateDB();
    for (var i = 0, cnt = csvStrings.length; i < cnt; i++) {
        var wordDataList = CSVToWordDataList(csvStrings[i], (1 << i));
        WordDataListToDB(wordDataList, db);
    }

    return db;
}

export default PrebuildDB;