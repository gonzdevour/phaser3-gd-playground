import SetupQuizPanel from './SetupQuizPanel.js';
import QuizResultModalPromise from '../quizpanel/QuizResultModalPromise.js';

var QuizPromise = async function (quizPanel, quiz) {
    while (!quiz.isLastQuestion) {
        var result = await QuizPanelPromise(quizPanel, quiz.nextQuestion);
        console.log(result);
        await QuizResultModalPromise(quizPanel.scene, result);
    }
    console.log('Quiz complete');
}

var QuizPanelPromise = function (quizPanel, question) {
    return new Promise(function (resolve, reject) {
        SetupQuizPanel(quizPanel, question, function (result) {
            resolve(result);
        })
    });
}

export default QuizPromise;