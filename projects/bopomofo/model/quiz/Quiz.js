import Question from './Question.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Shuffle = Phaser.Utils.Array.Shuffle;

class Quiz {
    constructor(config) {
        this.questions = [];
        this.questionIndex = 0;
        this.setTitleCallback(GetValue(config, 'titleCallback'));
    }

    setTitleCallback(callback) {
        this.titleCallback = callback;
        return this;
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
        if (this.titleCallback) {
            question.title = this.titleCallback.call(this, this.questionIndex, question);
        }

        this.questionIndex++;
        return question;
    }

    get isLastQuestion() {
        return (this.questionIndex >= this.questions.length);
    }

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