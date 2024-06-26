import EventEmitter from 'eventemitter3';
import DBWrap from './db/DBWrap.js';
import Quiz from './quiz/Quiz.js';
import QuizConfig from './data/QuizConfig.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Model extends EventEmitter {
    constructor(config) {
        super();

        var jsonList = GetValue(config, 'db', []);
        this.db = [];
        for (var i = 0, cnt = jsonList.length; i < cnt; i++) {
            var dbWrap = new DBWrap(i, jsonList[i])
            this.db.push(dbWrap);
        }

        this.quizConfig = new QuizConfig(this);

        // Only one quiz (series of question) is running one time
        this.quiz = new Quiz(this);
    }

    destroy() {
        // Do nothing
    }
}

export default Model;