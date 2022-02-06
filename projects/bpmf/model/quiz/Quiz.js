import Question from './question/Question.js';

//utils
import Shuffle from '../../../../plugins/utils/array/Shuffle.js';


//被Model.js呼叫，Quiz是一個設定好的題庫陣列

class Quiz {
    constructor(model) {
        this.model = model;
        this.questions = [];
        this.questionIndex = 0; //題號索引
    }

    toJSON() { //將目前設定好的題庫與目前題號轉JSON
        return {
            questions: this.questions.map(function (question) { return question.toJSON() }),
            questionIndex: this.questionIndex
        }
    }

    fromJSON(json) { //從JSON讀取，重建題庫與目前題號
        this.clearQuestions();

        var questionJSONList = json.questions;
        for (var i = 0, cnt = questionJSONList.length; i < cnt; i++) {
            var question = Question.FromJSON(this.model, questionJSONList[i]); //使用class static function
            this.addQuestion(question); //傳入new Question
        }
        this.questionIndex = json.questionIndex;
    }

    reset() { //題號歸0，從頭開始
        this.questionIndex = 0;
        return this;
    }

    get nextQuestion() { //Quiz.nextQuestion是需要計算的變動值
        if (this.questionIndex >= this.questions.length) {
            this.questionIndex = 0; //如果目前是最後一題，則題號歸0從頭開始
        }
        var question = this.questions[this.questionIndex]; //取得題庫的第N個
        this.questionIndex++; //將題號設定為N+1
        question.questionIndex = this.questionIndex;//把題號存進question裡讓quizPanel可以取得
        question.questionTotal = this.questions.length;//把總題數存進question裡讓quizPanel可以取得
        return question;
    }

    get isLastQuestion() { //Quiz.isLastQuestion是需要計算的變動值
        return (this.questionIndex >= this.questions.length);
    }


    /*     
    在BuildQuiz.js執行：
    //字庫中每個字都出一題(可以修改這裡的規則)
    for (var i = 0, cnt = characters.length; i < cnt; i++) {
        quiz.addQuestion({
            title: '', // TODO
            character: characters[i],
            choices: choices
        })
    }
    由new Question接收addQuestion指令
    */
    addQuestion(config) {
        var question;
        if (config instanceof Question) { //如果已經是Question就不用new(fromJSON)
            question = config;
        } else {
            question = new Question(config); //如果不是Question物件而只是JSON就new
        }
        this.questions.push(question); //組合題庫
        return this;
    }

    shuffleQuestions() { //題庫洗牌
        Shuffle(this.questions);
        return this;
    }

    clearQuestions() {
        this.questions.length = 0; //清空array
        this.reset(); //題號歸0
        return this;
    }
}

export default Quiz;