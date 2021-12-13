import DBWrap from './db/DBWrap.js';
import Quiz from './quiz/Quiz.js';
import LocalStorageData from '../../../../phaser3-rex-notes/plugins/localstorage-data.js';
import { DefaultData, DefaultQuizConfig } from './DefaultData.js'

const GetValue = Phaser.Utils.Objects.GetValue;

class Model {
    constructor(config) { //從CreateModel傳入config: {db: [this.cache.text.get("db0"), this.cache.text.get("db1")];}
        var jsonList = GetValue(config, 'db', []); //jsonList = 取出db中的array[db0, db1]，若無值則設為[]
        this.db = [];
        for (var i = 0, cnt = jsonList.length; i < cnt; i++) { //db0, db1，兩者為.compress壓縮字串
            var dbWrap = new DBWrap(this, jsonList[i]) //用DBWrap解壓縮後，傳入Model.db array裡
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