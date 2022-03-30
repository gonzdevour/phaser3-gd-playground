import GetBopomofoFilter from '../../../model/db/characters/query/GetBopomofoFilter.js';
import GetCombinedRhyme from '../../../model/db/characters/query/GetCombinedRhyme.js';

//utils
import Shuffle from '../../../../../plugins/utils/array/Shuffle.js';
import ArrIfContainKeyValue from '../../../../../plugins/utils/array/ArrIsContainKeyValue.js';

//建立題組
//被Quiz scene呼叫，從題庫建立題組回傳quiz，送到QuizPromise跟quizpanel組合
var BuildQuiz = function (model) {
    var quizConfig = model.getQuizConfig(); //從ls中取出紀錄並重建回QuizConfig並設定currentDB

    // See build/view/quizconfigpanel/Options.js, EnhanceOptions
    var enhancementMode = quizConfig.enhancement; //指定強化練習模式
    var filter;   // 依強化練習模式建立篩選器
    var choices;  // 依強化練習模式設定選項群
    switch (enhancementMode) {
        case '無': //模式為'無'時，篩選器是空物件，會篩出db全部的結果
            filter = {};
            break;

        case '結合韻': //模式為'結合韻'時，取出media不是空值，vowel也不是空值的docs
            filter = GetCombinedRhyme(); //定義在model/db/characters/query/裡
            break;

        default: //模式不是無也不是結合韻時，例如「ㄢㄣ」，則依此建立篩選器與選項群
            filter = GetBopomofoFilter(enhancementMode); //篩出有ㄢ或ㄣ的docs
            choices = enhancementMode; //以「ㄢㄣ」為固定的選項，此功能實現在quiz/question/ParseChoiceConfig裡
            break;
    }

    var characters = model.currentDB.characters.query( //在字庫中取出符合條件的字docs
        filter,
    );

    // See build/view/quizconfigpanel/Options.js, QuizModeOptions
    var quizMode = quizConfig.mode; //篩出字docs後，指定出題模式
    switch (quizMode) {
        case '隨機':
            Shuffle(characters); //隨機模式則洗牌字docs
            break;

        case '頻次':
            // Or sort by freq in characters.query(...)
            characters.sort(function(characterA, characterB){
                return characterA.freq - characterB.freq; //頻次模式將docs依freq由小至大排列
            })
            break;

        case '測驗':
            //TODO //指定幾題，有分數等系統(可以修改這裡的規則)
            Shuffle(characters);
            break;
    }

    //印出第一個charcter物件，測試用
    //console.log('characters[0]：' + '\n' + characters[0]);
    //console.log('characters[0].character：' + '\n' + characters[0].character);

    //把考過的character移到最後面、答錯的character移到最前面(每次都先複習答錯的)
    var rightList = model.appData.record.rightList;
    var wrongList = model.appData.record.wrongList;
    //篩出沒答對過的(字不在rightList中的character物件群)
    var undoneList = characters.filter(function(character, index, array){
        return ArrIfContainKeyValue(rightList, 'character', character.character) == false;
    });
    //篩出答對過的(字在rightList中的character物件群)
    var doneList = characters.filter(function(character, index, array){
        return ArrIfContainKeyValue(rightList, 'character', character.character) == true;
    });
    //從沒答對過的characters中篩出答錯過的
    var reviewList = undoneList.filter(function(character, index, array){
        return ArrIfContainKeyValue(wrongList, 'character', character.character) == true;
    });
    //從沒答對過的characters中篩出沒答錯過的
    var freshList = undoneList.filter(function(character, index, array){
        return ArrIfContainKeyValue(wrongList, 'character', character.character) == false;
    });
    console.log('reviewList' + '\n' + reviewList)
    console.log('doneList' + '\n' + doneList)
    //組合3組array：答錯過的在最前面，沒答過的在中間，答對過的在後面
    var arrangedChars = reviewList.concat(freshList).concat(doneList);

    // Now we have quiz characters
    // Clear and add these characters
    var quiz = model.quiz;
    quiz.clearQuestions(); //清除之前的題組

    //建立新題組：篩出來的字docs，每個字doc都出一題(可以修改這裡的規則)
    var arrangedCharsLength = arrangedChars.length;
    var qConfigCount = quizConfig.qcount;
    var quizCnt = quizMode='測驗'?qConfigCount:arrangedCharsLength;
    for (var i = 0, cnt = quizCnt; i < cnt; i++) {
        quiz.addQuestion({
            title: '', // TODO
            character: arrangedChars[i%arrangedCharsLength],//取餘數的用意是：如果題庫小於需出題數，以題庫數取餘數循環出題
            choices: choices
        })
    }

    return quiz;
}

export default BuildQuiz;