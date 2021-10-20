import DBWrap from './db/DBWrap.js';

const MaxDBCount = 4;
const GetValue = Phaser.Utils.Objects.GetValue;

class Model {
    constructor(config) {
        var jsonList = GetValue(config, 'db', []);
        this.db = [];
        for (var i = 0, cnt = jsonList.length; i < cnt; i++) {
            var dbWrap = new DBWrap(this, jsonList[i])
            this.db.push(dbWrap);
        }
    }
}

export default Model;