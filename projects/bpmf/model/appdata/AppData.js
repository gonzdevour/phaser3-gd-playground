import { DefaultRecord } from "../DefaultData";

class AppData {
  constructor(dataManager) {
      this.lsData = dataManager;
      this.record = DefaultRecord; //過去的作答紀錄，包含wrongList和rightList
      this.curRightCnt = 0; //目前的正確作答數
      this.curWrongCnt = 0; //目前的錯誤作答數
      this.curRightList = []; //目前從正確作答中紀錄的所有詞組成的陣列
      this.curWrongList = []; //目前從錯誤作答中紀錄的所有詞、字、輸入答案與正確答案等資料組成的陣列
  }
  reset() {
      this.curRightCnt = 0;
      this.curWrongCnt = 0;
      this.curRightList = [];
      this.curWrongList = [];
      return this;
  }
  load() { //從ls中取出過去的作答紀錄並重建回AppData.record
      var dataManager = this.lsData;
      var result = {};
      for (var key in DefaultRecord) { //使用DefaultRecord的key結構
          result[key] = dataManager.get(key);
      }
      this.record = result;
      return this;
  }
  save(config) { //將AppData的紀錄存入ls
      var dataManager = this.lsData;
      for (var key in DefaultRecord) { //使用DefaultRecord的key結構
          dataManager.set(key, config[key]);
      }
      return this;
  }
  log() {
    console.log('-- AppData --');
    console.log('curRightCnt:' + this.curRightCnt);
    console.log('curRightList:' + JSON.stringify(this.curRightList));
    console.log('curWrongCnt:' + this.curWrongCnt);
    console.log('curWrongList:' + JSON.stringify(this.curWrongList));
    console.log('record:' + JSON.stringify(this.record));
  }
}

export default AppData;