import Question from './question/Question.js';

const Shuffle = Phaser.Utils.Array.Shuffle;

class Quiz {
    constructor(model) {
        this.model = model;
        this.questions = [];
        this.questionIndex = 0;
    }

    toJSON() {
        return {
            questions: this.questions.map(function (question) { return question.toJSON() }),
            questionIndex: this.questionIndex
        }
    }

    fromJSON(json) {
        this.clearQuestions();

        var questionJSONList = json.questions;
        for (var i = 0, cnt = questionJSONList.length; i < cnt; i++) {
            var question = Question.FromJSON(this.model, questionJSONList[i]);
            this.addQuestion(question);
        }
        this.questionIndex = json.questionIndex;
    }

    reset() {
        this.questionIndex = 0;
        return this;
    }

    get nextQuestion() {
        if (this.questionIndex >= this.questions.length) {
            this.questionIndex = 0;
        }
        var question = this.questions[this.questionIndex];
        this.questionIndex++;
        return question;
    }

    get isLastQuestion() {
        return (this.questionIndex >= this.questions.length);
    }


    /*     
    在BuildQuiz.js執行：
    model.quiz.addQuestion({
        title: '', // TODO
        character: characters[i],
        choices: choices
    }) 
    由new Question接收
    */
    addQuestion(config) {
        var question;
        if (config instanceof Question) {
            question = config;
        } else {
            question = new Question(config);
        }
        this.questions.push(question);
        return this;
    }

    shuffleQuestions() {
        Shuffle(this.questions);
        return this;
    }

    clearQuestions() {
        this.questions.length = 0;
        this.reset();
        return this;
    }
}

export default Quiz;