import tfdb from '../../plugins/taffydb/taffy-min.js';

//utils
import Papa from 'papaparse';
import Shuffle from '../../plugins/utils/array/Shuffle.js';

var CreateQuiz = function(csvstring, qCnt){
    //csv轉json array
    var data = csvToJSONArr(csvstring);
    //taffy建立db(注意db是一個函數，要用db()才會回傳db物件)
    var db = tfdb.taffy(data);
    //回傳quizArr
    return makeQuiz(db,qCnt);
}

var csvToJSONArr = function(csvstring){
    return Papa.parse(csvstring, { header: true, dynamicTyping: true }).data //.data取出json array
}

var makeQuiz = function(db, qCnt){
    var randomQArr = Shuffle(db({FixIndex:'R'}).get()); //FixIndex欄位為R者是隨機題
    var fixedQDB = db({FixIndex:{'!is':'R'}}) //FixIndex欄位為Fixed者是固定題
    var fixedQArr = fixedQDB.get(); //取得固定題號的題目
    var fixedQArrIdxs = fixedQDB.select('Index'); //取得固定題號array
    var quizArr = [];
    for (let i = 0; i < qCnt; i++) {
        //此題號如果不是固定題號則隨機出題
        if (fixedQArrIdxs.indexOf(i) == -1){ 
            var quiz = randomQArr.pop();
            quizArr.push(quiz);
        }else{
            //此題號如果是固定題號則出固定題號的題目
            fixedQArr.forEach(function(fixedQ, index, arr){
                if(fixedQ['Index'] == i){
                    var quiz = fixedQ;
                    quizArr.push(quiz);
                }
            })
        }
    }
    return quizArr;
}

export default CreateQuiz;