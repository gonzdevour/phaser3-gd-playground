import yaml from 'js-yaml';
import mustache from 'mustache';
import loki from 'lokijs';
import GetValue from 'gdkPlugins/utils/object/GetValue.js';
import { Delay } from 'rexnotePlugins/eventpromise.js';

import CreateScenarioDialog from '../modaldialog/CreateScenarioDialog.js';

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

      this.mode_singleChar = false;
      this.mode_speechBubble = false;
      this.mode_auto = false;
      this.mode_skip = false;
      this.mode_hideUI = false;
      this.mode_portrait = true;

      this.backgroundAutoScale = true;

      this.initVPX = 0.5; //說話、移動、旁白時如果有指定角色，角色使用的預設vpx
      this.initVPY = 1.2; //說話、移動、旁白時如果有指定角色，角色使用的預設vpy
      this.defaultActorScale = 1.7;
      this.defaultTypingSpeed = 50;
      this.defaultSkipTimeScale = 5;
      this.defaultAutoDelayTime = 2000;

      this.lastTalkerID = ''; //上一個說話者(不包含移動)
      this.lastActorID = ''; //上一個行動者(包含移動與說話)
      this.nextLabel = '';
      this.mtView = {玩家名稱: 'GD'};
      this.tb_Char = scene.plugins.get('rexCsvToHashTable').add().loadCSV(scene.cache.text.get('dataChar'));
      this.db = new loki("ScenarioDirector");
      this.decisionRecord = this.db.addCollection("decisionRecord");
      this.questionIdx = 0; //by label的問題編號(每次彈出選項時+1，start label時重設為0)，用於儲存每一題的選擇結果/提供update的索引
      this.choices = []; 
      this.logData = [];
      this.logSideIdx = 0; //每次換人說話+1
      this.logSideMod = 2; //用modulo決定log要排在哪一側
      this.logSerifRowIdx = 0; //同一人連續說話+1

      this.coin = 50;

      //this.toggleSkip()
      //this.toggleAuto()

  }
  async init(){
    this.background = await this.createBackground('park',0)
    this.storyBox = await this.createStoryBox()
    this.background.setVisible(false);
    this.storyBox.setVisible(false);
  }
  createBackground(key, frame) {
    var tagPlayer = this.tagPlayer;
    var background = GetBackground(tagPlayer, 'story');
    return new Promise(function(resolve, reject){
      if (!background) {
        var content = `<bg.story=story,${key},${frame}>`;
        tagPlayer
        .playPromise(content)
        .then(function () {
            console.log('背景建立完成')
            background = GetBackground(tagPlayer, 'story');
            resolve(background);
        })
      } else {
        resolve(background);
      }
    })
  }
  createStoryBox() {
    var tagPlayer = this.tagPlayer;
    var storyBox = GetStoryBox(tagPlayer, 'story');
    return new Promise(function(resolve, reject){
      if (!storyBox) {
        var content = `<text.story=story>`;
        tagPlayer
        .playPromise(content)
        .then(function () {
            console.log('故事框建立完成')
            storyBox = GetStoryBox(tagPlayer, 'story');
            resolve(storyBox);
        })
      } else {
        resolve(storyBox);
      }
    })
  }
  save(slotKey, extraData) {
    var curLabel = this.scenario.lastLabel
    var date = new Date();
    var dateString = date.toLocaleString();
    var saveState = {
      label: curLabel,
      decisionRecord: this.decisionRecord.chain().data(),
      coin: this.coin,
      extraData: extraData?extraData:undefined,
      savingDate: dateString,
    }
    console.log('save:' + '\n' + saveState)
    this.lsData.set('scenario_save_slot' + slotKey, saveState)
  }
  async load(slotKey) { //slotIdx可以是數字或字串
    var saveState = this.lsData.get('scenario_save_slot' + slotKey)
    if (saveState){
      //讀取檔案
      this.coin = saveState.coin;
      this.decisionRecord.chain.find().remove();
      this.decisionRecord.insert(saveState.decisionRecord);
      //console.log(this.decisionRecord.chain().data())
      //初始化設定
      this.mode_auto = false;
      this.mode_skip = false;
      this.mode_hideUI = false;
      await this.presetLoad(saveState.label) //讀取此label的預存舞台設定
      this.next(saveState.label);
    } else {
      console.log('scenario_save_slot' + slotKey + ' does not exist')
    }
  }
  onClick() { //接收在clickArea上的任何點擊(排除上方的buttons)
    console.log('scenario clickArea clicked')
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
    if (duration === undefined){
      duration = 1000;
    }
    // var bg = GetBackground(this.tagPlayer, 'story');
    // bg.transit(filename,0);
    // debugger
    var content = ``;
    //content = content + `<bg.story.setDuration=${duration}>`;
    content = content + `<bg.story.transit=${filename},0>`;
    this.tagPlayer.playPromise(content)
      .then(function(){
        console.log(content);
        console.log('背景變化: ' + filename + ' - ' +duration);
      })
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
  震動(sec, intensity) { //預設強度0.05
    var ms = sec*1000;
    intensity = intensity<1?intensity:0.05;
    console.log(`震動${sec}秒 (強度：${intensity})`)
    this.camera.shake(ms, intensity)
  }
  選項(text, value) {
    var choice = {text: text, value: yaml.load(value)}
    this.choices.push(choice);
  }
  移動(actorID, expressionAlias, serif, easeAlias, x, y, xFrom, yFrom, duration, displayName) {
    actorID = mustache.render(String(actorID), this.mtView);
    if(displayName){
      displayName = mustache.render(String(displayName), this.mtView);
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
    actorID = mustache.render(String(actorID), this.mtView);
    var logType = '';
    if(displayName){
      if(actorID == 'Host'){
        logType = 'host';
      } else {
        logType = 'actor';
      }
      displayName = mustache.render(String(displayName), this.mtView);
    } else {
      logType = 'story';
      displayName = actorID
    }
    serif = mustache.render(String(serif), this.mtView);
    
    var actorData = this.tb_Char.table[actorID] //取得actorData不需要actor存在畫面上
    var actorColor = GetValue(actorData, 'nameColor', 333333)

    var expression = AliasToExpression(expressionAlias);
    duration = duration?duration*1000:0;

    if (x == undefined){ //理論上旁白不會用到vpxy，但是為了csv格式便利所以保留x,y,xFrom,yFrom,duration
      x = this.initVPX;
    }
    if (y == undefined){
      y = this.initVPY;
    }

    this.lastActorID = actorID; //旁白需要處理lastActorID，因為「旁白」指的是「不想要actor出現在畫面上時，storyBox上的actor對話呈現」

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
      logType: logType,logColor: actorColor, logIsHeader: ifDifferentTalker, logSerifRowIdx: logSerifRowIdx,
      actorID: actorID, displayName: displayName, expression: expression, serif: serif
    })

    var content = `<text.story.tell=${actorID},${actorColor},${displayName},${expression}>${serif}`;

    this.tagPlayer.setTimeScale(this.getTagPlayerTimeScale());
    this.tagPlayer.playPromise(content);

  }
  說話(actorID, expressionAlias, serif, easeAlias, x, y, xFrom, yFrom, duration, displayName, sound) {
    actorID = mustache.render(String(actorID), this.mtView); //如果有顯示名稱則使用顯示名稱，否則使用ID
    if(displayName){
      displayName = mustache.render(String(displayName), this.mtView);
    } else {
      displayName = actorID
    }
    serif = mustache.render(String(serif), this.mtView);

    var actor = GetActor(this.tagPlayer, actorID);
    var actorData = this.tb_Char.table[actorID]
    var actorColor = GetValue(actorData, 'nameColor', 333333)

    var ease = AliasToEase(easeAlias);
    var expression = AliasToExpression(expressionAlias);
    duration = duration?duration*1000:0;

    if (x == undefined){
      x = this.initVPX;
    }
    if (y == undefined){
      y = this.initVPY;
    }

    var lastTalkerID = this.lastTalkerID;
    var curTalkerID = actorID;

    var ifDifferentTalker = lastTalkerID == curTalkerID ? false : true;
    if (ifDifferentTalker){
      this.logSerifRowIdx = 0;
    } else {
      this.logSerifRowIdx++
    }
    var logSerifRowIdx = this.logSerifRowIdx

    this.隱藏對話();

    if (ifDifferentTalker){ //bubble模式
      this.storyBox.setVisible(false);
    }

    var content = ``;
    if (ifDifferentTalker){
      if (this.mode_singleChar){ //單角色畫面模式
        //this.隱藏對話();
        content = content + `</char>`
      } else { //多角色畫面模式下，如果換人說話，前個說話者會變黑
        content = content + `<char.${lastTalkerID}.shadow>`
      }
    }
    if (actor) {
      content = content + `<char.${curTalkerID}.unshadow>`
    } else {
      content = content + `<char.${actorID}=${actorID},${x},${y}>`
    }
    if (sound) {
      content = content + `</bgm2><bgm2=${sound}>`
    }
    if (displayName) {
      content = content + `<char.${actorID}.setDisplayName=${displayName}>`
    }
    if (expression) {
      content = content + `<char.${actorID}.setExpression=${expression}>` //變更立繪
      content = content + `<text.story.setPortrait=${actorID},${expression}>` //變更頭圖
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
      content = content + `<char.${actorID}.bringMeToTop>`
      if (this.scenario.director.mode_speechBubble){ //bubble模式 or storyBox模式
        content = content + `<char.${actorID}.talk>${serif}`
      } else {
        content = content + `<text.story.tell=${actorID},${actorColor},${displayName},${expression}>${serif}`;
      }
    }
    console.log(content);

    this.log({
      logType: 'actor',logColor: actorColor, logIsHeader: ifDifferentTalker, logSerifRowIdx: logSerifRowIdx,
      actorID: actorID, displayName: displayName, expression: expression, serif: serif
    })

    this.lastTalkerID = actorID;

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
        var result = await CreateScenarioDialog(scene, choices, viewport); //取得選擇結果
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

    //篩出qID相同的指定資料(如果存在)，把選擇結果的變數內容整筆更新
    // 在 LokiJS 中，我们需要手动检查是否存在相同 qID 的记录
    var existing = this.decisionRecord.findOne({ 'qID': header.qID });
    if (existing) {
      // 如果找到了，更新这条记录
      Object.assign(existing, data);
      this.decisionRecord.update(existing);
    } else {
      // 如果没找到，插入新记录
      this.decisionRecord.insert(data);
    }

    console.log('選擇紀錄：');
    console.log(this.decisionRecord.chain().data())
    console.log('Spring好感度總計：' + this.sumRecord('Spring','好感')) //統計功能測試
    console.log('Jade好感度總計：' + this.sumRecord('Jade','好感')) //統計功能測試
  }
  sumRecord(name, dataType) { //ex: sumRecord('Jade', '好感')
    //return this.decisionRecord().sum(name + dataType); //從taffy中找出某欄並加總，例如'Jade好感'這一欄
    var sum = 0;
    var qKey = name+dataType
    var data2sum = this.decisionRecord.chain().find({ [qKey]: { '$gt': 0 } }).data()
    console.log(qKey)
    data2sum.forEach(doc => {
      sum += doc[qKey];
    });
    console.log(data2sum)
    return sum;
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
  presetSave(label) {
    if (label != undefined){
      var content = ``;
      var backgroundTextureKey = this.background.texture.key;
      var portraitTextureKey = this.storyBox.portrait.texture.key;
      var allChars = this.tagPlayer.getGameObject('char');
      for (var key in allChars) {
          var char = allChars[key];
  
          var actorID = char.name;
          var displayName = char.displayName
          var expression = char.expression
          var x = char.vpx
          var y = char.vpy
          content = content + `<char.${actorID}=${actorID},${x},${y}>` //建立角色
          content = content + `<char.${actorID}.setDisplayName=${displayName}>` //設定顯示名稱
          content = content + `<char.${actorID}.setExpression=${expression}>` //變更立繪
      }
      content = content + `<text.story.setPortrait=${portraitTextureKey}>` //變更頭圖
      content = content + `<bg.story.transit=${backgroundTextureKey}>` //變更頭圖
      console.log(content);
      this.lsData.set(`scenario_preset_${label}`, content);
    }
  }
  async presetLoad(nextLabel) {
    var tagPlayer = this.tagPlayer;
    var content = this.lsData.get(`scenario_preset_${nextLabel}`); //字串content
    return new Promise(function(resolve, reject){
      if (content) {
        tagPlayer
        .playPromise(content)
        .then(function () {
            console.log('舞台預置完成')
            resolve();
        })
      } else {
        resolve();
      }
    })
  }
  async start(label) { //啟動
    var director = this;
    var scenario = this.scenario;
    this.controllPanel.setVisible(true);
    this.background.setVisible(true);
    //this.storyBox.setVisible(true); //storyBox class會自動處理visibility
    return scenario.playPromise({label:label})
      .then(function(){
          return director.onScenarioComplete()
      })
  }
  async onScenarioComplete() {
    var background = this.background;
    var storyBox = this.storyBox;
    this.controllPanel.setVisible(false);
    var content = ``;
    //content = content + `</bg>`;
    //content = content + `</text>`;
    content = content + `</char>`;
    this.tagPlayer.playPromise(content)
      .then(function(){
        background.setVisible(false);
        storyBox.setVisible(false);
        //console.log('scenario tagPlayer complete')
      })
  }
  async onTagPlayerComplete() {
    //console.log('on tagPlayer complete')
    if (this.storyBox != undefined){ //初始化的時候，tagPlayer.playPromise會用來建立預設物件，此時有可能storyBox和background都不存在
      if (this.storyBox.visible && this.storyBox.alpha != 0){
        this.storyBox.clickWaiter.setVisible(true);
      }
    }
    if (this.mode_auto){
      await Delay(this.getAutoDelayTime());
      console.log('scenario auto continue click')
      this.scenario.continue('click');
    }
  }
  async close() { //停止
    var scenario = this.scenario;
    var tagPlayer = this.tagPlayer;
    tagPlayer.pause();
    scenario.pause();
    scenario.emit('complete'); //會觸發playPromise.then
  }
  next(nextLabel) { //前往下一章節
    this.controllPanel.setVisible(true);
    this.logData = []; //每段label結束都清空log
    this.questionIdx = 0;
    nextLabel = nextLabel?nextLabel:this.nextLabel;
    this.presetSave(nextLabel) //將目前label的舞台走位等資訊存在nextLabel作為預設，待scenario load時可調用
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

var GetBackground = function(tagPlayer, backgroundID){
  return tagPlayer.getGameObject('bg', backgroundID);
}

// var buildCharsData = function(director, decisionRecord){
//   decisionRecord().each(function (record,recordnumber) { //"好感":[{"Jade":-1},{"Spring":2}]
//     record["好感"].forEach(function(value,idx,arr){
//       for (key in value) {
//       }
//     });
//   })
// }

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