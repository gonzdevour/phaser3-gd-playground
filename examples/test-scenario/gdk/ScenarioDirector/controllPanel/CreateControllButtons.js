import CreateRoundRectangleBackground from "../../templates/CreateRoundRectangleBackground";
import Style from "../../settings/Style";
import RegisterBehaviors from "../../behaviors/RegisterBehaviors";
import GetValue from "../../../../../plugins/utils/object/GetValue";

import { DialogY } from "../../modaldialog/DialogType";
import CreateGridLogPanel from "./LogPanel/CreateGridLogPanel";
import CreateSettingsPanel from "../../settings/CreateSettingsPanel";
import CreateGridSavePanel from "./SavePanel/CreateGridSavePanel";

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
    var viewport = this.scenario.director.viewport;
    DialogY(this, {
        //title: '複習列表',
        content: CreateGridSavePanel(this),
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
  var load = function(){};

  var config = function(){
    var _scene = this;
    var viewport = _scene.scenario.director.viewport;
    DialogY(_scene, {
      title: CreateTextLabel(_scene, '系統設定'),
      content: CreateSettingsPanel(_scene, viewport),
      extraConfig: {
        viewport: viewport,
        width: viewport.width-50,
        expand: {title: false, content: true}, //標題不延展panel延展
      }
    })
  };

  var leave = function(){
    var viewport = this.scenario.director.viewport;
    var _scene = this;
    DialogY(_scene, {
      //title: '複習列表',
      content: `要離開遊戲嗎？`,
      actions: [
        {imageKey:'ico_no', text: '取消', type: 'cancel', callback: undefined, closeDialog:true},
        {imageKey:'ico_yes', text: '確定', type: 'confirm', callback: undefined, closeDialog:true},
      ],
      buttonMode: 1, //是否手動manualClose
      extraConfig: { //客製調整參數
        background: _scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0),
        viewport: viewport,
        width: viewport.width-50,
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