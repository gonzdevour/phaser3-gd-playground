import Papa from 'papaparse'; //將csv格式轉成db的工具

const PolyphonicKeys = ['p', 'q']; //csv中有p1,p2,p3,p4 & q1,q2,q3,q4兩組破音
var CSVToWordDataList = function (csvString) {
    var data = Papa.parse(csvString, {
        header: true
    }).data;

    var PolyphonicKeysLength = PolyphonicKeys.length; //2

    var wordDataList = [];
    // Parse each row
    for (var i = 0, icnt = data.length; i < icnt; i++) {
        var item = data[i];
        var word = item.word; //詞

        // Parse each pinyin of this word
        var pinyins = [];//[[p1,p2,p3,p4],[q1,q2,q3,q4]]
        var charactersLength = word.length;
        for (var p = 0; p < PolyphonicKeysLength; p++) {
            var pinyin = [];
            for (var c = 0; c < charactersLength; c++) { //有幾個字就push幾組注音
                pinyin.push(item[`${PolyphonicKeys[p]}${c + 1}`]) //p1,p2,p3,p4 & q1,q2,q3,q4
            }
            pinyins.push(pinyin);
        }
        wordDataList.push({
            word: word, //詞條
            pinyins: pinyins, //[[p1,p2,p3,p4],[q1,q2,q3,q4]]
            freq: parseInt(item.freq) //freq(只是csv由上到下的序號)
        })
    }
    //wordDataList: [{word:詞條, pinyins:[[p1,p2,p3,p4],[q1,q2,q3,q4]], freq: index},...]
    return wordDataList;
}

export default CSVToWordDataList;