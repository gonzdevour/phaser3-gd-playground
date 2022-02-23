//utils
import Add from '../../../../../plugins/utils/array/Add.js';

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
                character: (isPass && polyphonyCharacter) ? polyphonyCharacter : question.character //題目字
            }

            record(quizPanel.scene.model.appData, verifyResult);

            if (onSubmit) { //如果有傳入callback function
                onSubmit(verifyResult); //呼叫callback，完成QuizPanelPromise，讓QuizPromise吐出next question循環
            }
        })

    return quizPanel;
}

var record = function(appData, verifyResult){
    var isPass = verifyResult.result;
    if (!isPass) { //如果沒通過，則將結果暫存在model.appData.reviewList裡，最後會整理合併於lsData的record.reviewList
        appData.curWrongCnt ++;
        var resultToSave = {
            input: verifyResult.input, //bopomofo
            word: verifyResult.word.word,
            character: verifyResult.character.character,
        }
        Add(appData.curWrongList, resultToSave);
        Add(appData.record.wrongList, resultToSave);
        console.log('X');

    } else { //如果通過，則將詞暫存在model.appData.correctList裡，最後會整理合併於lsData的record.correctList
        appData.curRightCnt ++;
        Add(appData.curRightList, verifyResult.word.word);
        Add(appData.record.rightList, verifyResult.word.word);
        console.log('O');
    }
    appData.save(appData.record);
    appData.log();
}

export default SetupQuizPanel;