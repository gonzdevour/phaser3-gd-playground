import SetupQuizPanel from './SetupQuizPanel.js';

var QuizPromise = function (quizPanel, question) {
    return new Promise(function (resolve, reject) {
        SetupQuizPanel(quizPanel, question, function (result) {
            resolve(result);
        })
    });
}

export default QuizPromise;