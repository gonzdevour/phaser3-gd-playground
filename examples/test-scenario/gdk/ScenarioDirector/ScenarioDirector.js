import yaml from 'js-yaml';
import mustache from 'mustache';
import tfdb from '../../../../plugins/taffydb/taffy-min.js';

class ScenarioDirector extends Phaser.Events.EventEmitter {
  constructor(scene, manager, viewport, storyBox) {
      super();
      this.scene = scene;
      this.scenario = scene.scenario;
      this.camera = scene.cameras.main;
      this.sound = scene.sound;
      this.manager = manager;
      this.viewport = viewport;

      this.background = scene.add.rexTransitionImage(viewport.centerX, viewport.centerY, 'park', 0, {}).setAlpha(0.2)
      scene.layerManager.addToLayer('scenario', this.background);
      scene.plugins.get('rexViewportCoordinate').add(this.background, viewport);

      this.storyBox = storyBox;
      scene.layerManager.addToLayer('story', this.storyBox);
      scene.plugins.get('rexViewportCoordinate').add(this.storyBox, viewport, 0.5, 0.9);

      scene.tweens.add({
        targets: storyBox,
        //vpy: '-=0.2',
        y:'-=100',
        yoyo: true,
        repeat: -1,
        duration: 2000,
      })

      this.decisionRecord = tfdb.taffy();
      this.nextLabel = '';
      this.coin = 50;
      this.choices = [];

      this.mode_singleChar = false;
      this.lastTalkerID = '';
      this.mtView = {玩家名稱: 'GD'};

      this.initVPX = 0.5;
      this.initVPY = 1.2;
  }
  清空() {
    this.清除對話();
    this.清除角色();
  }
  清除對話(charName) {
    if (charName){
      var char = this.manager.getGameObject('char', charName); //清除指定角色對話
      char.cleanTalk();
    } else {
      console.log('清除所有對話')
      var allChars = this.manager.getGameObject('char'); //清除所有角色對話
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
    this.manager
      .playPromise(cmd)
      .then(function () {
          console.log('清除角色' + charName)
      })
  }
  隱藏對話(charName) {
    if (charName){
      var char = this.manager.getGameObject('char', charName); //清除指定角色對話
      char.text.setVisible(false);
    } else {
      console.log('隱藏所有對話')
      var allChars = this.manager.getGameObject('char'); //清除所有角色對話
      for (var key in allChars) {
          var char = allChars[key];
          char.text.setVisible(false);
      }
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
    this.sound.play(filename);
  }
  選項(text, value) {
    var choice = {text: text, value: yaml.load(value)}
    this.choices.push(choice);
  }
  旁白(name, expressionAlias, serif) {
    var expression = AliasToExpression(expressionAlias);
    name = mustache.render(name, this.mtView);
    serif = mustache.render(serif, this.mtView);
    this.storyBox.playPromise(name, expression, serif)
      .then(function () {
          console.log('旁白完畢');
      })
  }
  移動(actorID, expressionAlias, serif, easeAlias, x, y, xFrom, yFrom, duration) {
    var actor = GetActor(this.manager, actorID);
    var ease = AliasToEase(easeAlias);
    var expression = AliasToExpression(expressionAlias);
    duration = duration?duration*1000:0;

    if (x == undefined){
      x = this.initVPX;
    }
    if (y == undefined){
      y = this.initVPY;
    }

    var ifNotSameChar = this.lastTalkerID == actorID ? false : true;
    this.lastTalkerID = actorID;

    this.隱藏對話();

    var content = ``;
    if (this.mode_singleChar && ifNotSameChar){
      //this.隱藏對話();
      content = content + `</char>`
    }
    if (!actor) {
      content = content + `<char.${actorID}=${actorID},${x},${y}>`
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

    console.log(content);
    this.manager
      .playPromise(content)
      .then(function () {
          console.log('Complete')
      })  

  }
  說話(actorID, expressionAlias, serif, easeAlias, x, y, xFrom, yFrom, duration) {
    var actor = GetActor(this.manager, actorID);
    var ease = AliasToEase(easeAlias);
    var expression = AliasToExpression(expressionAlias);
    duration = duration?duration*1000:0;

    serif = mustache.render(serif, this.mtView);

    if (x == undefined){
      x = this.initVPX;
    }
    if (y == undefined){
      y = this.initVPY;
    }

    var ifNotSameChar = this.lastTalkerID == actorID ? false : true;
    this.lastTalkerID = actorID;

    this.隱藏對話();

    var content = ``;
    if (this.mode_singleChar && ifNotSameChar){
      //this.隱藏對話();
      content = content + `</char>`
    }
    if (!actor) {
      content = content + `<char.${actorID}=${actorID},${x},${y}>`
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
    this.manager
      .playPromise(content)
      .then(function () {
          console.log('Complete')
      })
  }
  next(nextLabel) {
    nextLabel = nextLabel?nextLabel:this.nextLabel;
    this.scenario.start({label: nextLabel});
  }
  // callbacks
  exec(value) {
    var out = dataMap(this, value); //決定哪些是立即執行且執行後無法坐時光機回來更改的數值
    var curLabel = this.scenario.lastLabel
    var header = {};
    header.label = curLabel;
    var data = Object.assign({},out,header);
    this.decisionRecord.merge(data, 'label'); //篩出label相同的指定資料，把選擇結果的變數內容整筆更新
    console.log('show db:');
    console.log(this.decisionRecord().stringify());
    console.log('Spring好感度總計：' + this.sumRecord('Spring','好感'))
  }
  sumRecord(name, dataType) { //ex: sumRecord('Jade', '好感')
    return this.decisionRecord().sum(name + dataType);
  }
  finishTyping() { //立即完成text typing
    console.log('try to finish typing')
    var allChars = this.manager.getGameObject('char'); //清除所有角色對話
    for (var key in allChars) {
        var char = allChars[key];
        char.text.setTypeSpeed(0);
    }
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

var GetActor = function(manager, actorID){
  return manager.getGameObject('char', actorID);
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