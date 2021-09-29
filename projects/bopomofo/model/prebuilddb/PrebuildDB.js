import CreateDB from "./CreateDB";
import CSVToWordDataList from './CSVToWordDataList.js';
import WordDataListToDB from './WordDataListToDB.js'

var PrebuildDB = function (csvString) {
    var db = CreateDB();
    var wordDataList = CSVToWordDataList(csvString);
    WordDataListToDB(wordDataList, db);

    return db;
}

export default PrebuildDB;