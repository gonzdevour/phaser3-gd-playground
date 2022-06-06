import ModalDialogPromise from "../ModalDialogPromise";
import Style from "../../../../settings/Style";
import CreateRoundRectangleBackground from "../../style/CreateRoundRectangleBackground";

//behaviors
import yoyoScale from "../../../../../../templates/dialog/behavior/yoyoScale";
import ninja from "../../../../../../templates/gameObject/behaviors/ninja";

//utils
import GetValue from "../../../../../../plugins/utils/object/GetValue";

//複數個橫向決定按鈕的Dialog，透過actionsConfig指定button img和cbk
var DialogDefault = function (scene, cfg) {

  var extraConfig = GetValue(cfg, 'extraConfig', {}); //extraConfig可添加預設值以外的新值，或覆蓋預設config的值

  if (cfg === undefined){
      cfg = {};
  }

  if (cfg.background === undefined) {
    cfg.background = CreateRoundRectangleBackground(scene, 20, 0x0, 0xffffff, 2);
  }

  if ( typeof(cfg.title) === 'string' ){ 
    cfg.title = CreateTitle(scene, cfg.title, extraConfig) //建立元件，可能需要考慮style，所以傳入extraConfig控制
  }

  if ( typeof(cfg.content) === 'string' ){ 
    cfg.content = CreateContent(scene, cfg.content, extraConfig) //建立元件，可能需要考慮style，所以傳入extraConfig控制
  }

  if ( Array.isArray(cfg.actions) ){ 
    cfg.actions = CreateActions(scene, cfg.actions, extraConfig) //建立元件，可能需要考慮style，所以傳入extraConfig控制
  }

  if ( Array.isArray(cfg.choices) ){ 
    cfg.choices = CreateChoices(scene, cfg.choices, extraConfig) //建立元件，可能需要考慮style，所以傳入extraConfig控制
  }

  //通用預設值
  var valueConfig = {
    width: scene.viewport.displayWidth-50,
    x: scene.viewport.centerX,
    y: scene.viewport.centerY,
    space: { 
        left: 40, 
        right: 40, 
        top: 40, 
        bottom: 40, 
        item: 40, 
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
        content: false,//隨dialog的排版延展
        choices: true,
    },
    buttonMode: 1, //modalClose的模式選擇，0自動關閉，1手動關閉
  }

  //如果extraConfig有值則對dialogConfig覆蓋原值或加入新值
  var dialogConfig = Object.assign({}, cfg, valueConfig, extraConfig);

  return ModalDialogPromise(scene, dialogConfig)
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
        actions.push(CreateButton(scene, item).onClick(item.callback));
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
        choices.push(CreateButton(scene, item).onClick(item.callback));
        if(idx == arr.length-1){
            choices.push(scene.rexUI.add.space());
        }
    })
    return choices;
}

var CreateButton = function (scene, config) {
    var label = scene.rexUI.add.label({
        background: config.background?config.background:undefined,
        icon: config.imageKey?scene.add.image(0, 0, config.imageKey).setDisplaySize(90, 90):undefined,
        text: config.text?scene.rexUI.add.BBCodeText(0, 0, config.text, { fontFamily: Style.fontFamilyName, fontSize: 60 }):undefined,
        space: config.spaceSettings?config.spaceSettings:{},
    });
    var bhvs = GetValue(config, 'behavior', []);
    bhvs.forEach(function(bhv, idx, arr){
        if (RegisterBehaviors[bhv]){
            RegisterBehaviors[bhv](label);
        }
    })
    return label;
}

var RegisterBehaviors = {
    yoyoScale: yoyoScale,
    ninja: ninja,
}

export default DialogDefault;