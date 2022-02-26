//utils
import ArrAdd from '../../../../../plugins/utils/array/ArrAdd.js'; //array push內容不重複的item
import ArrRemove from '../../../../../plugins/utils/array/ArrRemove.js'; //array remove item(s)
import ArrAddOrUpdateItemIfKeyExist from '../../../../../plugins/utils/array/ArrAddOrUpdateItemIfKeyExist.js'; //傳入object，如果array中物件的indexKey重複則update，未重複則push
import ArrRemoveItemIfKeyExist from '../../../../../plugins/utils/array/ArrRemoveItemIfKeyExist.js'; //傳入object，如果array中物件的indexKey重複則remove

//清理上一題，並將新題目與panel組合起來，以作答callback回傳給QuizPromise
var SetupQuizPanel = function (quizPanel, question, onSubmit) {
    // Fill quizPanel，從這裡開始跟view扯上關係
    quizPanel
        .clearChoices() //清除選項群
        .setQIndexText('第' + question.questionIndex + '題' + '\n' + '共' + question.questionTotal + '題')
        //.setTitle(question.questionIndex) //設定標題
        .setWord(question.characters) //用字array設定詞
        .setChoicesText(question.createChoices()) //建立選項群並設定選項文字
        .layout() //排版
        .drawBounds(quizPanel.debugGraphics, 0xff0000)
        //debugger;
    // Note: make sure 'submit' is emitted (OK button clicked)    
    quizPanel
        //CreateQuizPanel.js會幫quizPanel掛上'changedata-focusCharacterIndex'事件
        //當字(題目)切換時，該字會變色並清除該字旁邊的注音。
        .setData('focusCharacterIndex', question.characterIndex)
        .on('ttsSpeak', function (scene) {
            //debugger;
            console.log('ttsSpeak:' + question.word.word);
            scene.model.speech.say(question.word.word);
        })
        .once('submit', function (result) { //callback回傳答案
            var isPass = question.verify(result); //比對答案
            if (!isPass) { // 如果答案沒通過，檢查是不是破音詞
                var polyphonyCharacter = question.getPolyphonyCharacter(); //取出破音詞
                if (polyphonyCharacter) { //如果有破音詞
                    isPass = question.setAnswer(polyphonyCharacter).verify(result);//比對破音詞
                }
            }

            var verifyResult = {
                result: isPass, //是否通過
                input: result, //答案內容
                word: question.word,//題目詞
                character: (isPass && polyphonyCharacter) ? polyphonyCharacter : question.character //題目字(含bopomofo)
            }

            record(quizPanel.scene.model.appData, verifyResult);

            if (onSubmit) { //如果有傳入callback function
                onSubmit(verifyResult); //呼叫callback，完成QuizPanelPromise，讓QuizPromise吐出next question循環
            }
        })

    return quizPanel;
}

var record = function(appData, verifyResult){
    var resultToSave = {
        //input: verifyResult.input, //bopomofo，使用者的錯誤作答
        word: verifyResult.word.word,
        character: verifyResult.character.character,
    }
    var isPass = verifyResult.result;

    if (!isPass) { //如果沒通過，則將結果暫存在model.appData.reviewList裡，最後會整理合併於lsData的record.reviewList
        appData.curWrongCnt = appData.curWrongCnt + 1;
        MoveItemBetweenList(appData.curRightList, appData.curWrongList, resultToSave);//將作答紀錄Add到本局的錯誤作答列表，如果本局中答對過則刪除本局的答對紀錄
        MoveItemBetweenList(appData.record.rightList, appData.record.wrongList, resultToSave);///將作答紀錄Add到紀錄中的錯誤作答列表，如果紀錄中答對過則刪除答對紀錄
        console.log('X');

    } else { //如果通過，則將詞暫存在model.appData.correctList裡，最後會整理合併於lsData的record.correctList
        appData.curRightCnt = appData.curRightCnt + 1;
        MoveItemBetweenList(appData.curWrongList, appData.curRightList, resultToSave);//將作答紀錄Add到本局的正確作答列表，如果本局中答錯過則刪除本局的答錯紀錄
        MoveItemBetweenList(appData.record.wrongList, appData.record.rightList, resultToSave);///將作答紀錄Add到紀錄中的正確作答列表，如果紀錄中答錯過則刪除答錯紀錄
        console.log('O');
    }
    appData.save(appData.record);
    appData.log();
}

var MoveItemBetweenList = function(fromList,toList,item){
    ArrAdd(toList, item);
    ArrRemove(fromList, item);
}

export default SetupQuizPanel;