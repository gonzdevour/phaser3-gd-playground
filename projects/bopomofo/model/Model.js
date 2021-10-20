import DBWrap from './db/DBWrap.js';

const MaxDBCount = 4;
const GetValue = Phaser.Utils.Objects.GetValue;

class Model {
    constructor(config) {
        var jsonList = GetValue(config, 'db', []);
        this.db = [];
        for (var i = 0; i < MaxDBCount; i++) {
            var dbWrap = new DBWrap(this, jsonList[i])
            this.db.push(dbWrap);
        }
    }

    get db0() {
        return this.db[0];
    }

    get db1() {
        return this.db[1];
    }

    get db2() {
        return this.db[2];
    }

    get db3() {
        return this.db[3];
    }
}

export default Model;