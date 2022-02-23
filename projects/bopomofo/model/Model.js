import DBWrap from './db/DBWrap.js';
import Quiz from './quiz/Quiz.js';
import QuizConfig from './data/QuizConfig.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Model {
    constructor(config) {
        var jsonList = GetValue(config, 'db', []);
        this.db = [];
        for (var i = 0, cnt = jsonList.length; i < cnt; i++) {
            var dbWrap = new DBWrap(this, jsonList[i])
            this.db.push(dbWrap);
        }

        this.quizConfig = new QuizConfig(this);

        // Only one quiz (series of question) is running one time
        this.quiz = new Quiz(this);
    }
}

export default Model;