import SetupQuizPanel from './SetupQuizPanel.js';
import QuizResultModalPromise from '../../view/quizpanel/QuizResultModalPromise.js';

// 被Quiz scene呼叫，組合quiz和quizpanel並等待作答結果
var QuizPromise = async function (quizPanel, quiz) {
    while (!quiz.isLastQuestion) { //如果不是最後一題
        var result = await QuizPanelPromise(quizPanel, quiz.nextQuestion);//清理上一題，將下一題與panel組合起來，回傳上一題作答結果
        console.log(result);
        await QuizResultModalPromise(quizPanel.scene, result); //顯示上一題作答結果(傳入scene和config給彈出面板Modal)
    }
    //最後一題，回傳結束
}

var QuizPanelPromise = function (quizPanel, question) { //清理上一題，並將quiz吐出的新question與panel組合起來
    return new Promise(function (resolve, reject) {
        SetupQuizPanel(quizPanel, question, function (result) { //SetupQuizPanel(quizPanel, question, onSubmit)
            resolve(result); //回傳作答結果
        })
    });
}

export default QuizPromise;