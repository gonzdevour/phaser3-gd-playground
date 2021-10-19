import DBWrap from './db/DBWrap.js';

const DBCount = 2;
const GetValue = Phaser.Utils.Objects.GetValue;

class Model {
    constructor(config) {
        var dbJsonList = GetValue(config, 'db', []);
        this.dbwraps = [];
        for (var i = 0; i < DBCount; i++) {
            var dbWrap = new DBWrap(dbJsonList[i])
            this.dbwraps.push(dbWrap);
        }
    }

    get db0() {
        return this.dbwraps[0];
    }

    get db1() {
        return this.dbwraps[1];
    }

    // get db2() {
    //     return this.dbwraps[2];
    // }
    // 
    // get db3() {
    //     return this.dbwraps[3];
    // }
}

export default Model;