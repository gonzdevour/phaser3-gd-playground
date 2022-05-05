import { DefaultData, DefaultQuizConfig, DefaultRecord, DefaultSettings } from "../DefaultData";
import DeviceLang from "../../../../plugins/utils/language/DeviceLang.js";
import AppLang from "../../../../plugins/utils/language/AppLang.js";

//utils
import MoveItemBetweenList from '../../../../plugins/utils/array/MoveItemBetweenList.js'
import UpdateItemBetweenListByKey from "../../../../plugins/utils/array/UpdateItemBetweenListByKey ";

class AppData { //lsData內的值另外用屬性存的理由是，也許這些值需要上傳到後台或者進行大量的處理，整理好比較方便，譬如Record。
  constructor(lsData) {
    this.lsData = lsData;
    this.loadSettings();  //建立this.settings:設定值如音量、語系設定等(相依於lsData)
    this.initLanguage();
  }
  initLanguage() {
    //初始化appLangAlias
    if(this.settings.appLangAlias == undefined){
      this.settings.AppLang = DeviceLang();
      this.settings.appLangAlias = AppLang()
      this.lsData.set('appLang', this.settings.AppLang)
      this.lsData.set('appLangAlias', this.settings.appLangAlias)
    }
    console.log('appLangAlias:' + this.settings.appLangAlias)

    //語系切換
    this.lsData.events.on('changedata-' + 'appLangAlias', function(parent, value, previousValue){
      this.settings.appLangAlias = value;
    },this);

    return this;
  }
  initAPI(scene) { //!在API讀取完成後!
    //設定音量
    scene.game.api.sound.setVolume(this.settings.volumeSE);

    //音量調整
    this.lsData.events.on('changedata-' + 'volumeSE', function(parent, value, previousValue){
      this.settings.volumeSE = value;
      scene.game.api.sound.setVolume(value);
    },this);

    return this;
  }
  initGame() {
    //quizConfig:關於出題的設定
    //record:過去的作答紀錄，包含wrongList和rightList
    this.loadQuizConfig();
    this.loadRecord();
    this.reset();
    return this;
  }
  reset() {
    this.curTimeElapsed = 0;//目前所花費的作答時間(ms)
    this.curRightCnt = 0;   //目前的正確作答數
    this.curWrongCnt = 0;   //目前的錯誤作答數
    this.curRightList = []; //目前從正確作答中紀錄的所有詞組成的陣列
    this.curWrongList = []; //目前從錯誤作答中紀錄的所有詞、字、輸入答案與正確答案等資料組成的陣列
    return this;
  }
  loadRecord() { //從ls中取出過去的作答紀錄並重建回AppData.record
    var dataManager = this.lsData;
    var result = {};
    for (var key in DefaultRecord) { //使用DefaultData的key結構
        var value = dataManager.get(key);
        result[key] = value?value:DefaultRecord[key];
    }
    this.record = result;
    return result;
  }
  loadSettings() { //從ls中取出設定並重建回AppData.settings
    var dataManager = this.lsData;
    var result = {};
    for (var key in DefaultSettings) { //使用DefaultData的key結構
        var value = dataManager.get(key);
        result[key] = value?value:DefaultSettings[key];
    }
    this.settings = result;
    return result;
  }
  loadQuizConfig() { //從ls中取出紀錄並重建回QuizConfig
    var dataManager = this.lsData;
    var result = {};
    for (var key in DefaultQuizConfig) { //使用DefaultQuizConfig的key結構
        var value = dataManager.get(key);
        result[key] = value?value:DefaultQuizConfig[key];
    }
    this.quizConfig = result;
    return result;
  }
  load() { //從ls中取出全部紀錄
    this.loadQuizConfig();
    this.loadRecord();
    this.loadSettings();
    return this;
  }
  save(config) { //將config存入ls
    var dataManager = this.lsData;
    for (var key in config) {
        dataManager.set(key, config[key]);
    }
    console.log('appdata saved')
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
        dbIdx: verifyResult.dbIdx,
    }
    var isPass = verifyResult.result;

    if (!isPass) { //如果沒通過，則將結果暫存在appData.reviewList裡，最後會整理合併於lsData的record.reviewList
        this.curWrongCnt = this.curWrongCnt + 1;
        //MoveItemBetweenList(this.curRightList, this.curWrongList, resultToSave);//將作答紀錄Add到本局的錯誤作答列表，如果本局中答對過則刪除本局的答對紀錄
        //MoveItemBetweenList(this.record.rightList, this.record.wrongList, resultToSave);///將作答紀錄Add到紀錄中的錯誤作答列表，如果紀錄中答對過則刪除答對紀錄
        UpdateItemBetweenListByKey(this.curRightList, this.curWrongList, resultToSave, 'character');//刪除所有同字的作答紀錄後，儲存本局最新的答錯紀錄
        UpdateItemBetweenListByKey(this.record.rightList, this.record.wrongList, resultToSave, 'character');//刪除所有同字的作答紀錄後，儲存最新的答錯紀錄到lsData
        //console.log('X');

    } else { //如果通過，則將詞暫存在appData.correctList裡，最後會整理合併於lsData的record.correctList
        this.curRightCnt = this.curRightCnt + 1;
        //MoveItemBetweenList(this.curWrongList, this.curRightList, resultToSave);//將作答紀錄Add到本局的正確作答列表，如果本局中答錯過則刪除本局的答錯紀錄
        //MoveItemBetweenList(this.record.wrongList, this.record.rightList, resultToSave);///將作答紀錄Add到紀錄中的正確作答列表，如果紀錄中答錯過則刪除答錯紀錄
        UpdateItemBetweenListByKey(this.curWrongList, this.curRightList, resultToSave, 'character');//刪除所有同字的作答紀錄後，儲存本局最新的答對紀錄
        UpdateItemBetweenListByKey(this.record.wrongList, this.record.rightList, resultToSave, 'character');//刪除所有同字的作答紀錄後，儲存最新的答對紀錄到lsData
        //console.log('O');
    }
    this.recordUpdate();
    //this.log();
    return this;
  }
}

export default AppData;