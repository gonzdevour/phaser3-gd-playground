import yaml from 'js-yaml';
import mustache from 'mustache';
import tfdb from '../../../../plugins/taffydb/taffy-min.js';
import GetValue from '../../../../plugins/utils/object/GetValue.js';
import { Delay } from '../../../../../phaser3-rex-notes/plugins/eventpromise.js';

import CreateWaitingDialog from '../../scripts/CreateWaitingDialog.js';

class ScenarioDirector extends Phaser.Events.EventEmitter {
  constructor(scene, config) {
      super();
      this.scene = scene;
      this.lsData = scene.game.lsData;
      this.camera = scene.cameras.main;

      this.scenario = GetValue(config, 'scenario', undefined)
      this.tagPlayer = GetValue(config, 'tagPlayer', undefined)
      this.viewport = GetValue(config, 'viewport', scene.viewport)

      this.scenario.director = this;

      this.background = scene.add.rexTransitionImage(this.viewport.centerX, this.viewport.centerY, 'park', 0, {}).setAlpha(0.2)
      scene.layerManager.addToLayer('scenario', this.background);
      scene.vpc.add(this.background, this.viewport);

      this.mode_singleChar = false;
      this.mode_speechBubble = false;
      this.mode_auto = false;
      this.mode_skip = false;
      this.mode_hideUI = false;


      this.initVPX = 0.5;
      this.initVPY = 1.2;
      this.defaultTypingSpeed = 50;
      this.defaultSkipTimeScale = 5;
      this.defaultAutoDelayTime = 2000;

      this.lastTalkerID = ''; //上一個說話者(不包含移動)
      this.lastActorID = ''; //上一個行動者(包含移動與說話)
      this.nextLabel = '';
      this.mtView = {玩家名稱: 'GD'};
      this.tb_Char = scene.plugins.get('rexCsvToHashTable').add().loadCSV(scene.cache.text.get('dataChar'));
      this.decisionRecord = tfdb.taffy();
      this.questionIdx = 0; //by label的問題編號(每次彈出選項時+1，start label時重設為0)，用於儲存每一題的選擇結果/提供update的索引
      this.choices = []; 
      this.logData = [];
      this.logSideIdx = 0; //每次換人說話+1
      this.logSideMod = 2; //用modulo決定log要排在哪一側
      this.logSerifRowIdx = 0; //同一人連續說話+1

      this.coin = 50;

      this.createStoryBox();

      //this.toggleSkip()
      //this.toggleAuto()

  }
  save(slotKey, extraData) {
    var curLabel = this.scenario.lastLabel
    var date = new Date();
    var dateString = date.toLocaleString();
    var saveState = {
      label: curLabel,
      decisionRecord: this.decisionRecord().stringify(),
      coin: this.coin,
      extraData: extraData?extraData:undefined,
      savingDate: dateString,
    }
    console.log('save:' + '\n' + saveState)
    this.lsData.set('scenario_save_slot' + slotKey, saveState)
  }
  load(slotKey) { //slotIdx可以是數字或字串
    var saveState = this.lsData.get('scenario_save_slot' + slotKey)
    if (saveState){
      //讀取檔案
      this.coin = saveState.coin;
      this.decisionRecord().remove();
      this.decisionRecord().insert(saveState.decisionRecord);
      //初始化設定
      this.mode_auto = false;
      this.mode_skip = false;
      this.mode_hideUI = false;
      this.next(saveState.label);
    } else {
      console.log('scenario_save_slot' + slotKey + ' does not exist')
    }
  }
  onClick() { //接收在clickArea上的任何點擊(排除上方的buttons)
    console.log('clickArea clicked')
    if (this.mode_hideUI){
      this.showUI();
    } else {
      if (this.mode_auto){
        this.mode_auto = false;
        this.mode_skip = false;
        this.tagPlayer.setTimeScale(1);
      }
      if (this.scenario.isPlayingText){
          console.log('request finish typing');
          this.finishTyping();
      } else {
          if (this.tagPlayer.isPlaying){ //如果tagPlayer正在播放且不處於wait的狀態
              this.tagPlayer.setTimeScale(10);
          } else {
              this.tagPlayer.setTimeScale(1);
              this.scenario.continue('click');
          }
      }
    }
  }
  onScenarioLog(msg) {
    console.log('sLog: ' + msg)
  }
  onScenarioComplete() {
    console.log('scenario complete')
  }
  async onTagPlayerComplete() {
    //console.log('on tagPlayer complete')
    if (this.storyBox.visible && this.storyBox.alpha != 0){
      this.storyBox.clickWaiter.setVisible(true);
    }
    if (this.mode_auto){
      await Delay(this.getAutoDelayTime());
      console.log('scenario auto continue click')
      this.scenario.continue('click');
    }
  }
  onWaitClick(waiterName, lastScenarioCmd) {
    console.log(waiterName + ' on wait click - ' + lastScenarioCmd)
  }
  toggleAuto() {
    this.onClick();
    console.log('on toggleAuto')
    this.mode_auto = this.mode_auto?false:true;
  }
  toggleSkip() {
    this.onClick();
    console.log('on toggleSkip')
    this.mode_skip = this.mode_skip?false:true;
    this.mode_auto = this.mode_skip?true:false;
    this.tagPlayer.setTimeScale(this.getTagPlayerTimeScale());
  }
  hideUI() {
    if (this.mode_hideUI == false){
      console.log('on hideUI')
      this.mode_hideUI = true;
      this.scene.layerManager.getLayer('ui').setVisible(false);
      this.storyBox.setVisible(false);
    }
  }
  showUI() {
    if (this.mode_hideUI == true){
      console.log('on showUI')
      this.mode_hideUI = false
      this.scene.layerManager.getLayer('ui').setVisible(true);
      this.storyBox.setVisible(true);
    }
  }
  getTypingSpeed(speed) {
    if (speed == undefined){
      speed = this.defaultTypingSpeed;
      speed = this.mode_skip?1:speed;
    }
    return speed;
  }
  getAutoDelayTime() {
    return this.mode_skip?0:this.defaultAutoDelayTime;
  }
  getTagPlayerTimeScale() {
    return this.mode_skip?this.defaultSkipTimeScale:1;
  }
  createStoryBox() {
    var storyBox = GetStoryBox(this.tagPlayer, 'story');
    if (!storyBox) {
      var content = `<text.story=story>`;
      this.tagPlayer
      .playPromise(content)
      .then(function () {
          console.log('故事框建立完成')
      })
    }
  }
  清空() {
    this.清除對話();
    this.清除角色();
  }
  清除對話(charName) {
    if (charName){
      var char = this.tagPlayer.getGameObject('char', charName); //清除指定角色對話
      char.cleanTalk();
    } else {
      console.log('清除所有對話')
      var allChars = this.tagPlayer.getGameObject('char'); //清除所有角色對話
      for (var key in allChars) {
          var char = allChars[key];
          char.cleanTalk();
      }
    }
  }
  清除角色(charName) {
    var cmd = ``;
    if (charName){
      this.清除對話(charName);      //清除指定角色的對話泡
      cmd = `</char.${charName}>`; //清除指定角色
    } else {
      this.清除對話();  //清除所有角色的對話泡
      cmd = `</char>`; //清除所有角色
    }
    this.tagPlayer
      .playPromise(cmd)
      .then(function () {
          console.log('清除角色' + charName)
      })
  }
  隱藏對話(charName) { //直接執行多個mode的子function，在子function中才判斷mode
    //this.storyBox.close();
    if (charName){
      var char = this.tagPlayer.getGameObject('char', charName); //清除指定角色對話氣泡
      this.hideBubble(char.bubble);
    } else {
      var allChars = this.tagPlayer.getGameObject('char'); //清除所有角色對話氣泡
      for (var key in allChars) {
          var char = allChars[key];
          this.hideBubble(char.bubble);
      }
    }
  }
  hideBubble(bubble){
    if (this.mode_speechBubble){ //bubble模式
      bubble.setVisible(false);
    }
  }
  背景(filename, duration){
    console.log('背景: ' + filename + ' - ' +duration)
    if (duration === undefined){
      duration = 1000;
    }
    if (this.background){
      this.background.transit({
        key: filename, 
        frame: 0,
        duration: duration,
      });
    }
  }
  淡入(duration) {
    duration = duration?duration:1000;
    console.log('淡入: ' + duration)
    this.camera.fadeIn(duration);
  }
  音效(filename) {
    console.log('音效: ' + filename)
    this.scene.audio.play(filename);
  }
  選項(text, value) {
    var choice = {text: text, value: yaml.load(value)}
    this.choices.push(choice);
  }
  移動(actorID, expressionAlias, serif, easeAlias, x, y, xFrom, yFrom, duration, displayName) {
    actorID = mustache.render(actorID, this.mtView);
    if(displayName){
      displayName = mustache.render(displayName, this.mtView);
    } else {
      displayName = actorID
    }
    var actor = GetActor(this.tagPlayer, actorID);
    var ease = AliasToEase(easeAlias);
    var expression = AliasToExpression(expressionAlias);
    duration = duration?duration*1000:0;

    if (x == undefined){
      x = this.initVPX;
    }
    if (y == undefined){
      y = this.initVPY;
    }

    this.lastActorID = actorID;

    var ifDifferentTalker = this.lastTalkerID == actorID ? false : true;
    //this.lastTalkerID = actorID; //只移動的時候，即使與前一個表演者不同人，也不改變this.lastTalkerID，以免動到log的判斷

    this.隱藏對話();
    this.storyBox.setVisible(false);

    var content = ``;
    if (this.mode_singleChar && ifDifferentTalker){
      //this.隱藏對話();
      content = content + `</char>`
    }
    if (!actor) {
      content = content + `<char.${actorID}=${actorID},${x},${y}>`
    }
    if (displayName) {
      content = content + `<char.${actorID}.setDisplayName=${displayName}>`
    }
    if (expression) {
      content = content + `<char.${actorID}.setExpression=${expression}>`
    }
    if (x && !xFrom){
      content = content + `<char.${actorID}.vpx.to=${x},${duration},${ease}>`
    }
    if (y && !yFrom){
      content = content + `<char.${actorID}.vpy.to=${y},${duration},${ease}>`
    }
    if (xFrom){
      if (x && x != this.vpx){
        content = content + `<char.${actorID}.vpx=${x}>`
      }
      content = content + `<char.${actorID}.vpx.from=${xFrom},${duration},${ease}>`
    }
    if (yFrom){
      if (y && y != this.vpy){
        content = content + `<char.${actorID}.vpy=${y}>`
      }
      content = content + `<char.${actorID}.vpy.from=${yFrom},${duration},${ease}>` 
    }
    content = content + `<wait=${duration+100}>` //無typing的狀況也要加wait使tagPlayer complete晚於scenario.on('wait.click')

    console.log(content);
    this.tagPlayer.setTimeScale(this.getTagPlayerTimeScale());
    this.tagPlayer.playPromise(content);
 

  }
  旁白(actorID, expressionAlias, serif, easeAlias, x, y, xFrom, yFrom, duration, displayName) {
    actorID = mustache.render(actorID, this.mtView);
    var logType = '';
    if(displayName){
      logType = 'host';
      displayName = mustache.render(displayName, this.mtView);
    } else {
      logType = 'story';
      displayName = actorID
    }
    serif = mustache.render(serif, this.mtView);

    var expression = AliasToExpression(expressionAlias);
    duration = duration?duration*1000:0;

    if (x == undefined){
      x = this.initVPX;
    }
    if (y == undefined){
      y = this.initVPY;
    }

    this.lastActorID = actorID;

    var ifDifferentTalker = this.lastTalkerID == actorID ? false : true;
    if (ifDifferentTalker){
      this.logSerifRowIdx = 0;
    } else {
      this.logSerifRowIdx++
    }
    var logSerifRowIdx = this.logSerifRowIdx
    this.lastTalkerID = actorID;

    this.隱藏對話();

    if (ifDifferentTalker){ //bubble模式
      this.storyBox.setVisible(false);
    }

    this.log({
      logType: logType,logColor: 0x0, logIsHeader: ifDifferentTalker, logSerifRowIdx: logSerifRowIdx,
      actorID:actorID, displayName: displayName, expression: expression, serif: serif
    })

    var content = `<text.story.tell=${displayName},${expression}>${serif}`;

    this.tagPlayer.setTimeScale(this.getTagPlayerTimeScale());
    this.tagPlayer.playPromise(content);

  }
  說話(actorID, expressionAlias, serif, easeAlias, x, y, xFrom, yFrom, duration, displayName) {
    actorID = mustache.render(actorID, this.mtView);
    if(displayName){
      displayName = mustache.render(displayName, this.mtView);
    } else {
      displayName = actorID
    }
    serif = mustache.render(serif, this.mtView);

    var actor = GetActor(this.tagPlayer, actorID);
    var actorData = this.tb_Char.table[actorID]
    var actorColor = actorData.nameColor?actorData.nameColor:0x0
    var ease = AliasToEase(easeAlias);
    var expression = AliasToExpression(expressionAlias);
    duration = duration?duration*1000:0;

    if (x == undefined){
      x = this.initVPX;
    }
    if (y == undefined){
      y = this.initVPY;
    }

    this.lastActorID = actorID;

    var ifDifferentTalker = this.lastTalkerID == actorID ? false : true;
    if (ifDifferentTalker){
      this.logSerifRowIdx = 0;
    } else {
      this.logSerifRowIdx++
    }
    var logSerifRowIdx = this.logSerifRowIdx
    this.lastTalkerID = actorID;

    this.隱藏對話();

    if (ifDifferentTalker){ //bubble模式
      this.storyBox.setVisible(false);
    }

    var content = ``;
    if (this.mode_singleChar && ifDifferentTalker){
      //this.隱藏對話();
      content = content + `</char>`
    }
    if (!actor) {
      content = content + `<char.${actorID}=${actorID},${x},${y}>`
    }
    if (displayName) {
      content = content + `<char.${actorID}.setDisplayName=${displayName}>`
    }
    if (expression) {
      content = content + `<char.${actorID}.setExpression=${expression}>`
    }
    if (x && !xFrom){
      content = content + `<char.${actorID}.vpx.to=${x},${duration},${ease}>`
    }
    if (y && !yFrom){
      content = content + `<char.${actorID}.vpy.to=${y},${duration},${ease}>`
    }
    if (xFrom){
      if (x && x != this.vpx){
        content = content + `<char.${actorID}.vpx=${x}>`
      }
      content = content + `<char.${actorID}.vpx.from=${xFrom},${duration},${ease}>`
    }
    if (yFrom){
      if (y && y != this.vpy){
        content = content + `<char.${actorID}.vpy=${y}>`
      }
      content = content + `<char.${actorID}.vpy.from=${yFrom},${duration},${ease}>`
    }
    if (duration){
      content = content + `<wait=${duration}>`
    }
    if (serif){
      content = content + `<wait=100>`
      content = content + `<char.${actorID}.talk>${serif}`
    }
    console.log(content);

    this.log({
      logType: 'actor',logColor: actorColor, logIsHeader: ifDifferentTalker, logSerifRowIdx: logSerifRowIdx,
      actorID: actorID, displayName: displayName, expression: expression, serif: serif
    })

    this.tagPlayer.setTimeScale(this.getTagPlayerTimeScale());
    this.tagPlayer.playPromise(content);
  }
  choicePop() { //彈出選項
    var scene = this.scene;
    var scenario = this.scenario
    var director = this;
    var choices = this.choices;
    var viewport = this.viewport;
    var dialog = async function(){
        var result = await CreateWaitingDialog(scene, choices, viewport); //取得選擇結果
        var resultIndex = result.singleSelectedName-1; //singleSelectedName從1開始，1234
        var resultText = choices[resultIndex].text;
        var resultValue = choices[resultIndex].value;

        director.log({
          logType: 'choice',logColor: 0x0, logSideIdx: 0, logIsHeader: true,
          actorID:'選項', displayName: '選項', expression: undefined, serif:resultText 
        })

        director.choiceExec(resultValue) //執行選擇結果
        director.choices = []; //清空choices
        scenario.continue('choose');
    }
    dialog();
    return this;
  }
  choiceExec(value) { //執行選擇結果
    var out = dataMap(this, value); //重新整理傳入資料，例如：[{"Jade":-1},{"Spring":2}] → dataMap → {{Jade好感: -1},{Spring好感: 2}}
    this.questionIdx++;
    var curQIdx = this.questionIdx;
    var curLabel = this.scenario.lastLabel;
    var header = {}; //建立資料header
    header.label = curLabel; //存入章節名稱作為資料索引
    header.qID = curLabel + curQIdx; //以<章節名稱+題目序號>為資料ID
    var data = Object.assign({},out,header); //組合header與資料
    this.decisionRecord.merge(data, 'qID'); //篩出qID相同的指定資料(如果存在)，把選擇結果的變數內容整筆更新
    console.log('選擇紀錄：' + '\n' + this.decisionRecord().stringify());
    console.log('Spring好感度總計：' + this.sumRecord('Spring','好感')) //統計功能測試
  }
  sumRecord(name, dataType) { //ex: sumRecord('Jade', '好感')
    return this.decisionRecord().sum(name + dataType); //從taffy中找出某欄並加總，例如'Jade好感'這一欄
  }
  finishTyping() { //立即完成text typing
    console.log('try to finish typing')
    var allChars = this.tagPlayer.getGameObject('char');
    for (var key in allChars) {
        var char = allChars[key];
        char.bubble.setTypingSpeed(0); //立即完成所有bubble
    }
    var allTexts = this.tagPlayer.getGameObject('text');
    for (var key in allTexts) {
        var text = allTexts[key];
        text.textPlayer.setTypingSpeed(0) //立即完成所有textPlayer
    }
  }
  next(nextLabel) { //啟動
    this.logData = [];
    this.questionIdx = 0;
    nextLabel = nextLabel?nextLabel:this.nextLabel;
    this.scenario.start({label: nextLabel});
  }
  log(config) {
    var logSideIdx = this.logSideIdx % this.logSideMod;
    var logIsHeader = GetValue(config, 'logIsHeader', false)

    if (this.logData.length == 0){ //如果this.logData為空，則無論如何這一條log都是header
      config.logIsHeader = true;
      logIsHeader = true;
    }

    if (logIsHeader){

      this.logSideIdx++ //如果這一條是header則logSide排到另一邊
      logSideIdx = this.logSideIdx % this.logSideMod;

    } else { 

      if (this.logData.length > 0){ //取出上一條log
        var arr = this.logData;
        var lastLogData = arr[arr.length-1];
        lastLogData.logIsFooter = false; //如果這一條不是header，則上一條不是footer
      }

    }
    if (config.logSideIdx == undefined){ //如果有值表示config有強制設定(例如選項選擇)，無值時才存入此處計算的logSideIdx
      config.logSideIdx = logSideIdx;
    }
    config.logIsFooter = true; //無論如何最新的一條log都是footer
    this.logData.push(config)
  }
  print(msg) {
    this.scene.appendText(msg)
  }
}

var dataMap = function(director, value){
  for (var key in value) {

    if (key == '好感') {
      value[key].forEach(function(obj, idx, arr){ //[{"Jade":-1},{"Spring":2}]
        for (var charName in obj) {
          value[charName + '好感'] = obj[charName] //out: {{Jade好感: -1},{Spring好感: 2}}
        }
      })
    }

    //決定next時執行的是哪個章節
    if (key == '章節') {
      console.log('next chapter: ' + value[key])
      director.nextLabel = value[key]
    }

  }
  delete value['好感'];

  return value;
}

var GetActor = function(tagPlayer, actorID){
  return tagPlayer.getGameObject('char', actorID);
}

var GetStoryBox = function(tagPlayer, storyBoxID){
  return tagPlayer.getGameObject('text', storyBoxID);
}

var buildCharsData = function(director, decisionRecord){
  decisionRecord().each(function (record,recordnumber) { //"好感":[{"Jade":-1},{"Spring":2}]
    record["好感"].forEach(function(value,idx,arr){
      for (key in value) {
      }
    });
  })
}

var AliasToExpression = function(expressionAlias){
  var list = {
    無:'normal0',
    驚:'shock0',
    呆:'shock1',
    懼:'fear0',
  }
  var result = list[expressionAlias];
  if (result){
    return result;
  } else {
    return 'normal0';
  }
}

var AliasToEase = function(easeAlias){
  var list = {
    平滑:'Linear',
    伸縮:'Elastic',
    加速:'Cubic',
    彈跳:'Bounce',
  }
  var result = list[easeAlias];
  if (result){
    return result;
  } else {
    return 'Linear';
  }
}

export default ScenarioDirector;