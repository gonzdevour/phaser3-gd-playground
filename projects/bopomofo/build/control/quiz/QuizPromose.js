import SetupQuizPanel from './SetupQuizPanel.js';
import QuizResultModalPromise from '../../view/quizpanel/QuizResultModalPromise.js';

var QuizPromise = async function (quizPanel, quiz, model) {
    while (!quiz.isLastQuestion) {
        var result = await QuizPanelPromise(quizPanel, quiz.nextQuestion);
        console.log(result);

        // Fire event of model to process result
        // model.emit(eventName, result);

        await QuizResultModalPromise(quizPanel.scene, result);
    }
    // End of quiz
}

var QuizPanelPromise = function (quizPanel, question) {
    return new Promise(function (resolve, reject) {
        SetupQuizPanel(quizPanel, question, function (result) {
            resolve(result);
        })
    });
}

export default QuizPromise;