import DBWrap from './db/DBWrap.js';
import Quiz from './quiz/Quiz.js';
import LocalStorageData from '../../../../phaser3-rex-notes/plugins/localstorage-data.js';
import { DefaultData, DefaultQuizConfig } from './DefaultData.js'

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

        // Only one quiz (series of question) is running one time
        this.quiz = new Quiz(this);
    }

    getQuizConfig() {
        var dataManager = this.lsData;
        var result = {};
        for (var key in DefaultQuizConfig) {
            result[key] = dataManager.get(key)
        }
        return result;
    }

    setQuizConfig(config) {
        var dataManager = this.lsData;
        for (var key in DefaultQuizConfig) {
            dataManager.set(key, config[key]);
        }
        return this;
    }
}

export default Model;