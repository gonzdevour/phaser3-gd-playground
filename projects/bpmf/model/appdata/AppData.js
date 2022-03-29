import { DefaultRecord } from "../DefaultData";

//utils
import MoveItemBetweenList from '../../../../plugins/utils/array/MoveItemBetweenList.js'

class AppData {
  constructor(dataManager) {
      this.lsData = dataManager;
      this.record = DefaultRecord; //過去的作答紀錄，包含wrongList和rightList
      this.curTimeElapsed = 0; //目前所花費的作答時間(ms)
      this.curRightCnt = 0; //目前的正確作答數
      this.curWrongCnt = 0; //目前的錯誤作答數
      this.curRightList = []; //目前從正確作答中紀錄的所有詞組成的陣列
      this.curWrongList = []; //目前從錯誤作答中紀錄的所有詞、字、輸入答案與正確答案等資料組成的陣列
  }
  reset() {
      this.curTimeElapsed = 0;
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
      for (var key in DefaultRecord) { //使用DefaultRecord的key結構，判斷只有在DefaultRecord裡的key才會被存入
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
  recordUpdate() { //將AppData.record的紀錄存入ls
    this.save(this.record);
    return this;
  }
  recordQuizResult(verifyResult) {
    //@SetupQuizPanel.js
    //verifyResult = {
    //    result: isPass, //是否通過
    //    input: result, //bopomofo，使用者的作答內容
    //    word: question.word,//題目詞
    //    character: (isPass && polyphonyCharacter) ? polyphonyCharacter : question.character //題目字(含bopomofo)
    //}
    var resultToSave = {
        word: verifyResult.word.word,
        character: verifyResult.character.character,
    }
    var isPass = verifyResult.result;

    if (!isPass) { //如果沒通過，則將結果暫存在model.appData.reviewList裡，最後會整理合併於lsData的record.reviewList
        this.curWrongCnt = this.curWrongCnt + 1;
        MoveItemBetweenList(this.curRightList, this.curWrongList, resultToSave);//將作答紀錄Add到本局的錯誤作答列表，如果本局中答對過則刪除本局的答對紀錄
        MoveItemBetweenList(this.record.rightList, this.record.wrongList, resultToSave);///將作答紀錄Add到紀錄中的錯誤作答列表，如果紀錄中答對過則刪除答對紀錄
        //console.log('X');

    } else { //如果通過，則將詞暫存在model.appData.correctList裡，最後會整理合併於lsData的record.correctList
        this.curRightCnt = this.curRightCnt + 1;
        MoveItemBetweenList(this.curWrongList, this.curRightList, resultToSave);//將作答紀錄Add到本局的正確作答列表，如果本局中答錯過則刪除本局的答錯紀錄
        MoveItemBetweenList(this.record.wrongList, this.record.rightList, resultToSave);///將作答紀錄Add到紀錄中的正確作答列表，如果紀錄中答錯過則刪除答錯紀錄
        //console.log('O');
    }
    this.recordUpdate();
    //this.log();
    return this;
  }
}

export default AppData;