import CreateRoundRectangleBackground from "../../templates/CreateRoundRectangleBackground";
import Style from "../../settings/Style";
import RegisterBehaviors from "../../behaviors/RegisterBehaviors";

import GetValue from "../../../../../plugins/utils/object/GetValue";

var log = function(scene){};
var auto = function(scene){};
var skip = function(scene){};
var toggleVisible = function(scene){};
var save = function(scene){};
var load = function(scene){};
var config = function(scene){};
var leave = function(scene){};

const btnData = [
  {text:'LOG', fn:log},
  {text:'AUTO', fn:auto},
  {text:'SKIP', fn:skip},
  {text:'HIDE', fn:toggleVisible},
  {text:'SAVE', fn:save},
  {text:'LOAD', fn:load},
  {text:'CONFIG', fn:config},
  {text:'LEAVE', fn:leave},
]

var CreateOptionLabel = function (scene, config) {
  var btn = scene.rexUI.add.label({
    background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),
    // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
    text: scene.rexUI.add.BBCodeText(0, 0, GetValue(config, 'text', ''), { fontFamily: Style.fontFamilyName, fontSize: 24 }),
    space: { left: 10, right: 10, top: 10, bottom: 10, icon: 10 },

    name: GetValue(config, 'text', '')   // !! button.name會被用在buttons.value的指定
  }).onClick(GetValue(config, 'fn', undefined), scene)

  RegisterBehaviors(btn, ['ninja']);

  return btn;
}

//fixWidthButtons可以自動換行排列button
var CreateStoryBoxButtons = function(scene, x, y, width, height){

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

export default CreateStoryBoxButtons;