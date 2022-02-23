import DBWrap from './db/DBWrap.js';
import Quiz from './quiz/Quiz.js';
import LocalStorageData from '../../../../phaser3-rex-notes/plugins/localstorage-data.js';
import QuizConfig from './data/QuizConfig.js';
import { DefaultData } from './DefaultData.js'

const GetValue = Phaser.Utils.Objects.GetValue;

class Model {
    constructor(config) {
        var jsonList = GetValue(config, 'db', []);
        this.db = [];
        for (var i = 0, cnt = jsonList.length; i < cnt; i++) {
            var dbWrap = new DBWrap(this, jsonList[i])
            this.db.push(dbWrap);
        }

        this.lsData = new LocalStorageData({
            name: 'bopomofo',
            default: DefaultData
        })

        this.quizConfig = new QuizConfig(this, this.lsData);

        // Only one quiz (series of question) is running one time
        this.quiz = new Quiz(this);
    }
}

export default Model;