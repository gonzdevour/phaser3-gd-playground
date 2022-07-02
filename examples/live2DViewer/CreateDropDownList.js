import GetValue from "../../plugins/utils/object/GetValue";

const COLOR_PRIMARY = 0x474747; //#474747
const COLOR_LIGHT = 0x8f8f8f; //#8f8f8f
const COLOR_DARK = 0x222222; //#222222

var CreateDropDownList = function(scene, config){
  var character = GetValue(config, 'character', undefined);
  var dropDownList = scene.rexUI.add.dropDownList({
      x: GetValue(config, 'x', 0), 
      y: GetValue(config, 'y', 0),
      //rtl: true,
      background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY),
      icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, COLOR_LIGHT),
      text: CreateTextObject(scene, GetValue(config, 'title', ''),),
      space: { left: 10, right: 10, top: 10, bottom: 10, icon: 10 },

      options: GetValue(config, 'options', []),

      list: {
          createBackgroundCallback: function (scene) {
              return scene.rexUI.add.roundRectangle(0, 0, 2, 2, { tl: 20, tr: 20, bl: 0, br: 0 }, COLOR_DARK).setStrokeStyle(6, COLOR_PRIMARY);
          },
          createButtonCallback: function (scene, option, index, options) {
              var text = option;
              var button = scene.rexUI.add.label({
                  background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20),
                  text: CreateTextObject(scene, text),
                  space: {left: 10, right: 10, top: 20, bottom: 20, icon: 10},
              });
              button.value = option;

              return button;
          },

          // scope: dropDownList
          onButtonClick: GetValue(config, 'onButtonClickCallback', undefined),

          // scope: dropDownList
          onButtonOver: function (button, index, pointer, event) {
              button.getElement('background').setStrokeStyle(3, 0xffffff);
          },

          // scope: dropDownList
          onButtonOut: function (button, index, pointer, event) {
              button.getElement('background').setStrokeStyle();
          },
          space: { item: 10 },
          easeIn: 0,
          easeOut: 0,
      },

      setValueCallback: function (dropDownList, value, previousValue) {
          console.log(value);
      },
      value: undefined,

  })
      .layout();
  
  return dropDownList;
}

var CreateTextObject = function (scene, text) {
  return scene.add.text(0, 0, text, { fontSize: 48, padding: 6 })
}

export default CreateDropDownList;