import loki from 'lokijs';
//utils
import Papa from 'papaparse';
import Shuffle from 'gdkPlugins/utils/array/Shuffle.js';

var CreateQuiz = function(csvstring, qCnt){
    //csv轉json array
    var data = csvToJSONArr(csvstring);
    //loki建立db
    var dbManager = new loki("quiz")
    var db = dbManager.addCollection('q');
    db.insert(data);
    //回傳quizArr
    return makeQuiz(db,qCnt);
}

var csvToJSONArr = function(csvstring){
    return Papa.parse(csvstring, { header: true, dynamicTyping: true }).data //.data取出json array
}

function makeQuiz(db, qCnt) {
    // 获取FixIndex为'R'的随机题，并打乱顺序
    var randomQArr = Shuffle(db.find({ 'FixIndex': 'R' }));

    // 获取FixIndex不为'R'的固定题
    var fixedQArr = db.find({ 'FixIndex': { '$ne': 'R' } });

    // 获取固定题的Index数组
    var fixedQArrIdxs = fixedQArr.map(function(fixedQ) {
        return fixedQ.Index;
    });

    var quizArr = [];
    for (let i = 0; i < qCnt; i++) {
        // 如果当前题号不在固定题号中，则从随机题中抽取
        if (!fixedQArrIdxs.includes(i)) {
            var quiz = randomQArr.pop();
            quizArr.push(quiz);
        } else {
            // 如果当前题号是固定题号，则添加固定题目
            fixedQArr.forEach(function(fixedQ) {
                if (fixedQ.Index === i) {
                    quizArr.push(fixedQ);
                }
            });
        }
    }
    return quizArr;
}

export default CreateQuiz;