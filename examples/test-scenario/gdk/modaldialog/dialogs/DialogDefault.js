import ModalDialogPromise from '../ModalDialogPromise.js';
import Style from "../../settings/Style.js";
import CreateRoundRectangleBackground from '../../templates/CreateRoundRectangleBackground.js';
import RegisterBehaviors from '../../behaviors/RegisterBehaviors.js';

//utils
import GetValue from '../../../../../plugins/utils/object/GetValue';
import IsPlainObjectArray from '../../../../../plugins/utils/object/IsPlainObjectArray.js';

//複數個橫向決定按鈕的Dialog，透過actionsConfig指定button img和cbk
var DialogDefault = function (scene, cfg) {

  var extraConfig = GetValue(cfg, 'extraConfig', {}); //extraConfig可添加預設值以外的新值，或覆蓋預設config的值

  if (cfg === undefined){
      cfg = {};
  }

  if (cfg.name === undefined){ //可以用dialog.name來取得名稱
    cfg.name = 'DialogDefault';
  }

  if (cfg.background === undefined) { //背景
    //cfg.background = CreateRoundRectangleBackground(scene, 20, 0x0, 0xffffff, 2);
  }

  if ( typeof(cfg.title) === 'string' ){  //標題
    cfg.title = CreateTitle(scene, cfg.title, extraConfig) //建立元件，可能需要考慮style，所以傳入extraConfig控制
  }

  if ( typeof(cfg.content) === 'string' ){  //內容
    cfg.content = CreateContent(scene, cfg.content, extraConfig) //建立元件，可能需要考慮style，所以傳入extraConfig控制
  }

  if ( IsPlainObjectArray(cfg.actions) ){ //下方按鈕群 (要確定cfg.actions不是建好的label群而必須是手寫的JSON array)
    cfg.actions = CreateActions(scene, cfg.actions, extraConfig) 
  }

  if ( IsPlainObjectArray(cfg.choices) ){ //選項按鈕群 (要確定cfg.choices不是建好的label群而必須是手寫的JSON array)
    cfg.choices = CreateChoices(scene, cfg.choices, extraConfig) 
  }

  //通用預設值
  var defaultValueConfig = {
    width: scene.viewport.width-50,
    x: scene.viewport.centerX,
    y: scene.viewport.centerY,
    space: { 
        left: 20, 
        right: 20, 
        top: 20, 
        bottom: 20, 
        item: 20, 
        action: 20, 
        choices: 0, //跟action的間距
        choicesLeft: 0,
        choicesRight: 0,
        choicesBackgroundTop: 10,
        choicesBackgroundBottom: 10,
        choicesBackgroundLeft: 20,
        choicesBackgroundRight: 20,
        choice: 15,
    },
    expand:{
        title: false, //不隨dialog的排版延展
        content: false,
        choices: true, //隨dialog的排版延展
    },
    manualClose: true, //modalClose的模式選擇，自動關閉/手動關閉
    transitIn:0, //0('popUp')|1('fadeIn')|false(null)|customCallback(obj,dur)
    transitOut:0, //0('scaleDown')|1('fadeOut')|false(null)|customCallback(obj,dur)
    duration:{ //transition的時間
      in: 200,
      hold: 2000, //自動關閉前的持續時間，manualClose為true時會disable這個數值
      out: 200
    },
  }

  //如果extraConfig有值則對dialogConfig覆蓋原值或加入新值
  var dialogConfig = Object.assign({}, cfg, defaultValueConfig, extraConfig); //第一層key先全部覆蓋

  if (extraConfig.space){ //基於預設值將下層調整補回
    dialogConfig.space = Object.assign({}, defaultValueConfig.space, extraConfig.space);
  }
  if (extraConfig.expand){
    dialogConfig.expand = Object.assign({}, defaultValueConfig.expand, extraConfig.expand);
  }
  if (extraConfig.duration){
    dialogConfig.duration = Object.assign({}, defaultValueConfig.duration, extraConfig.duration);
  }

  return ModalDialogPromise(scene, dialogConfig);
}

//客製函數

var CreateTitle = function(scene, title, config){
    var titleStyle = GetValue(config, 'titleStyle', { fontFamily: Style.fontFamilyName, fontSize: 60 });
    return scene.rexUI.add.BBCodeText(0, 0, title, titleStyle);
}

var CreateContent = function(scene, content,config){
    var contentStyle = GetValue(config, 'contentStyle', { fontFamily: Style.fontFamilyName, fontSize: 48 });
    return scene.rexUI.add.BBCodeText(0, 0, content, contentStyle);
}

var CreateActions = function(scene, config){
    var actions = [];
    config.forEach(function(item, idx, arr){
        actions.push(scene.rexUI.add.space());
        actions.push(CreateButton(scene, item));
        if(idx == arr.length-1){
            actions.push(scene.rexUI.add.space());
        }
    })
    return actions;
}

var CreateChoices = function(scene, config){
    var choices = [];
    config.forEach(function(item, idx, arr){
        choices.push(scene.rexUI.add.space());
        choices.push(CreateButton(scene, item));
        if(idx == arr.length-1){
            choices.push(scene.rexUI.add.space());
        }
    })
    return choices;
}

var CreateButton = function (scene, config) {
    var label = scene.rexUI.add.label({
      background: GetValue(config, 'background', undefined),
      icon: CreateIcon(scene, config),
      text: CreateText(scene, config),
      space: GetValue(config, 'spaceSettings', {}),
    });
    //註冊pointer特效
    RegisterBehaviors(label, GetValue(config, 'behavior', []))
    //賦予按鈕類型
    label.type = GetValue(config, 'type', 'none');
    //此按鈕是否關閉dialog
    label.closeDialog = GetValue(config, 'closeDialog', false);
    //註冊callback
    if ( typeof(config.callback) === 'function' ){ 
        label.onClick(config.callback)
    }

    return label;
}

var CreateIcon = function(scene, config){
  var icon = undefined;
  var imageKey = GetValue(config, 'imageKey', undefined);
  if (imageKey){
    icon = scene.add.image(0, 0, imageKey).setDisplaySize(90, 90)
  }
  return icon;
}

var CreateText = function(scene, config){
  var textObj = undefined;
  var text = GetValue(config, 'text', undefined);
  if (text){
    textObj = scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: Style.fontFamilyName, fontSize: 36 })
  }
  return textObj;
}

export default DialogDefault;