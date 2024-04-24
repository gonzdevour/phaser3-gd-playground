import CreateRoundRectangleBackground from "../../templates/CreateRoundRectangleBackground";
import Style from "../../settings/Style";
import RegisterBehaviors from "../../behaviors/RegisterBehaviors";
import GetValue from "gdkPlugins/utils/object/GetValue";

import { DialogY } from "../../modaldialog/DialogType";
import { TransitionScaleUpTitleUP } from "../../modaldialog/TransistionType";

import CreateGridLogPanel from "./LogPanel/CreateGridLogPanel";
import CreateSettingsPanel from "../../settings/CreateSettingsPanel";
import CreateGridSavePanel from "./SavePanel/CreateGridSavePanel";
import CreateGridLoadPanel from "./LoadPanel/CreateGridLoadPanel";

var CreateBtnData = function(){ //這裡的this都是onClick時傳過來的scope:scene

  var log = function(){
    var viewport = this.scenario.director.viewport;
    var logData = this.scenario.director.logData;
    DialogY(this, {
        //title: '複習列表',
        content: CreateGridLogPanel(this, logData ),
        actions: [
          {imageKey:'ico_yes', text: '確定', type: 'confirm', callback: undefined, closeDialog:true},
        ],
        buttonMode: 1, //是否手動manualClose      
        extraConfig: { //客製調整參數
          viewport: viewport,
          width: viewport.width-50,
          duration:{ in: 600, out: 300 },
      }
    })
  };

  var save = function(){
    var scene = this;
    var viewport = scene.scenario.director.viewport;
    DialogY(scene, {
        title: CreateTitleLabel(scene, '冒險之書', '選擇存檔欄位'),
        content: CreateGridSavePanel(this, 30),
        actions: [
          {imageKey:'ico_no', text: '關閉', type: 'cancel', callback: undefined, closeDialog:true},
        ],
        buttonMode: 1, //是否手動manualClose      
        extraConfig: { //客製調整參數
          viewport: viewport,
          width: viewport.width-50,
          transitIn: TransitionScaleUpTitleUP, //titleLabel專用轉場
          duration:{ in: 600, out: 300 },
          align: {title: 'left'}, //讓dialog title靠左
          expand: {title: true}, //讓dialog title的background延展
      }
    })
  };

  var load = function(){
    var scene = this;
    var viewport = scene.scenario.director.viewport;
    DialogY(scene, {
        title: CreateTitleLabel(scene, '冒險之書', '選擇讀檔欄位'),
        content: CreateGridLoadPanel(this, 30),
        actions: [
          {imageKey:'ico_no', text: '關閉', type: 'cancel', callback: undefined, closeDialog:true},
        ],
        buttonMode: 1, //是否手動manualClose      
        extraConfig: { //客製調整參數
          viewport: viewport,
          width: viewport.width-50,
          transitIn: TransitionScaleUpTitleUP, //titleLabel專用轉場
          duration:{ in: 600, out: 300 },
          align: {title: 'left'}, //讓dialog title靠左
          expand: {title: true}, //讓dialog title的background延展
      }
    })
  };

  var config = function(){
    var scene = this;
    var viewport = scene.scenario.director.viewport;
    DialogY(scene, {
      title: CreateTextLabel(scene, '系統設定'),
      content: CreateSettingsPanel(scene, viewport),
      extraConfig: {
        viewport: viewport,
        width: viewport.width-50,
        expand: {title: false, content: true}, //標題不延展panel延展
      }
    })
  };

  var leave = function(){
    var scene = this;
    var viewport = scene.scenario.director.viewport;
    DialogY(scene, {
      //title: '複習列表',
      content: `要離開遊戲嗎？`,
      actions: [
        {imageKey:'ico_no', text: '取消', type: 'cancel', callback: undefined, closeDialog:true},
        {imageKey:'ico_yes', text: '確定', type: 'confirm', callback: undefined, closeDialog:true},
      ],
      buttonMode: 1, //是否手動manualClose
      extraConfig: { //客製調整參數
        background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0),
        viewport: viewport,
        width: viewport.width-100,
        duration:{ in: 600, out: 300 },
        space: { top: 40 },
      },
    })
  };
  
  var auto = function(){
    this.scenario.director.toggleAuto();
  };

  var skip = function(){
    this.scenario.director.toggleSkip();
  }

  var hide = function(){
    this.scenario.director.hideUI();
  }

  var btnData = [
    {text:'LOG', fn:log},
    {text:'AUTO', fn:auto},
    {text:'SKIP', fn:skip},
    {text:'HIDE', fn:hide},
    {text:'SAVE', fn:save},
    {text:'LOAD', fn:load},
    {text:'CONFIG', fn:config},
    {text:'LEAVE', fn:leave},
  ]

  return btnData;
}

var CreateTitleLabel = function (scene, title, text) {
  //var tLabel_background = scene.rexUI.add.roundRectangle(0, 0, 100, 100, 10, 0x1565c0);
  var tLabel_title = scene.rexUI.add.BBCodeText(0, 0, title, {fontFamily: Style.fontFamilyName, fontSize:48, testString:'回龍', padding: 10});
  var tLabel_separator = scene.rexUI.add.roundRectangle(0, 0, 50, 4, 0, 0xffffff).setOrigin(0,0.5);
  var tLabel_text = scene.rexUI.add.BBCodeText(0, 0, text, {fontFamily: Style.fontFamilyName, fontSize:32, testString:'回龍', padding: 10});
  //var tLabel_icon = scene.add.rectangle(0, 0, 40, 40, 0xff00ff);
  var tLabel = scene.rexUI.add.titleLabel({
    //background: tLabel_background,
    title: tLabel_title,
    separator: tLabel_separator,
    text: tLabel_text,
    //icon: tLabel_icon,
    align: { title: 'left', text: 'right'},
    space: {
        left: 0, right: 0, top: 0, bottom: -20, icon: 10, separator: 2, 
        //separatorLeft: -60, separatorRight: -10,
    }
  });
  return tLabel;
}

var CreateTextLabel = function (scene, text) {
  return scene.rexUI.add.label({
    //background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),
    // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
    text: scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: Style.fontFamilyName, fontSize: 48 }),
    space: { left: 10, right: 10, top: 20, bottom: 10, icon: 10 },
  })
}

var CreateOptionLabel = function (scene, config) {
  var btn = scene.rexUI.add.label({
    background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),
    // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
    text: scene.rexUI.add.BBCodeText(0, 0, GetValue(config, 'text', ''), { fontFamily: Style.fontFamilyName, fontSize: 24 }),
    space: { left: 10, right: 10, top: 10, bottom: 10, icon: 10 },

    name: GetValue(config, 'text', '')   // !! button.name會被用在buttons.value的指定
  }).onClick(GetValue(config, 'fn', undefined), scene) //以scene作為fn裡的this

  RegisterBehaviors(btn, ['ninja']);

  return btn;
}

//fixWidthButtons可以自動換行排列button
var CreateControllButtons = function(scene, x, y, width, height){
  var btnData = CreateBtnData(scene);
  var buttons = [];
  for (var i = 0, cnt = btnData.length; i < cnt; i++) {
      buttons.push(
          CreateOptionLabel(scene, btnData[i])
      )
  }
  var fixWidthButtons = scene.rexUI.add.fixWidthButtons({
    x: x, y: y, width: width, height: height,
    align: 'justify',
    // justifyPercentage: 1,
    // justify在rexUI中的規則是：當該行元素超過justifyPercentage時自動換行，否則左右對齊
    space: { line: 5, item: 5 },
    buttons: buttons,
    setValueCallback: function (button, value, previousValue) {
        button.getElement('background')
            .setFillStyle((value) ? 0x8B4513 : undefined)
    },
  })

  return fixWidthButtons;
}

export default CreateControllButtons;