import Question from './Question.js';

class Quiz {
    constructor() {
        this.questions = [];
    }

    addQuestion(config) {
        var question;
        if (config instanceof Question) {
            question = config;
        } else {
            question = new Question(question);
        }
        this.questions.push(question);
        return this;
    }
}

export default Quiz;