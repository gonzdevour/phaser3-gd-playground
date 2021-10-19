import Papa from 'papaparse';

const PolyphonicKeys = ['p', 'q'];
var CSVToWordDataList = function (csvString, dbIndex) {
    var data = Papa.parse(csvString, {
        header: true
    }).data;

    var PolyphonicKeysLength = PolyphonicKeys.length;

    var wordDataList = [];
    // Parse each row
    for (var i = 0, icnt = data.length; i < icnt; i++) {
        var item = data[i];
        var word = item.word;

        // Parse each pinyin of this word
        var pinyins = [];
        var charactersLength = word.length;
        for (var p = 0; p < PolyphonicKeysLength; p++) {
            var pinyin = [];
            for (var c = 0; c < charactersLength; c++) {
                pinyin.push(item[`${PolyphonicKeys[p]}${c + 1}`])
            }
            pinyins.push(pinyin);
        }
        wordDataList.push({
            db: dbIndex,
            word: word,
            pinyins: pinyins,
            freq: parseInt(item.freq),            
        })
    }
    return wordDataList;
}

export default CSVToWordDataList;