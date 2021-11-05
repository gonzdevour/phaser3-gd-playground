import DBWrap from './db/DBWrap.js';
import Quiz from './quiz/Quiz.js';
import LocalStorageData from '../../../../phaser3-rex-notes/plugins/localstorage-data.js';

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
            default: DefaultQuizConig
        })

        // Only one quiz (series of question) is running one time
        this.quiz = new Quiz(this);
    }

    getQuizConfig() {
        var dataManager = this.lsData;
        return {
            database: dataManager.get('database'),
            enhancement: dataManager.get('enhancement'),
            mode: dataManager.get('mode'),
        }
    }

    setQuizConfig(config) {
        var dataManager = this.lsData;
        dataManager.set('database', config.database);
        dataManager.set('enhancement', config.enhancement);
        dataManager.set('mode', config.mode);
        return this;
    }
}

var DefaultQuizConig = {
    database: '高頻詞庫',
    enhancement: '無',
    mode: '隨機'
}

export default Model;