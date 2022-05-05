import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import Style from '../../../settings/Style.js';
import Save from '../../../model/appdata/Save.js';

//utils
import GetValue from '../../../../../plugins/utils/object/GetValue.js';

const COLOR_PRIMARY = 0x111111;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x222222;

var CreateSettingsPanel = function (scene) {

  var settings = scene.model.appData.loadSettings();
  var quizConfig = scene.model.appData.loadQuizConfig();

  var mainPanel = scene.rexUI.add.sizer({
    orientation: 'y',
    space: { item: 30 },
    sizerEvents: true,
  })
  .on('postlayout', function(child, sizer){
    scene.log('mainPanel postlayout')
    scene.drawBounds(sizer);
  })

  /*
  //建立音樂音量控制   
  var bgmCtrl = CreateNumberBar(scene,{
    iconText: '音樂',
    iconImageKey: 'music', 
    value: settings.volumeBGM,
    callback: function (value, oldValue, numberBar) {
      numberBar.text = Math.round(value*100)+'%';
      Save(scene,'volumeBGM', value);
    }
  }) 

  //建立語音音量控制(plugin似乎沒提供語音音量控制)
  var speakCtrl = CreateNumberBar(scene,{
    iconText: '語音',
    iconImageKey: 'speak', 
    value: settings.volumeSpeak,
    callback: function (value, oldValue, numberBar) {
      numberBar.text = Math.round(value*100)+'%';
      Save(scene,'volumeSpeak', value);
    }
  })

  */

  //建立音效音量控制
  var seCtrl = CreateNumberBar(scene,{
    iconText: '音效',
    iconImageKey: 'sound', 
    value: settings.volumeSE,
    callback: function (value, oldValue, numberBar) {
      numberBar.text = Math.round(value*100)+'%';
      Save(scene,'volumeSE', value);
    }
  }).on('inputend', function(pointer) {
    scene.game.api.sound.play(scene, 'right');
  }, scene);
 
  //建立題數控制(min1~50max)
  var qcntCtrl = CreateNumberBar(scene,{
    iconText: '題數',
    iconImageKey: 'qcnt', 
    value: quizConfig.qcount/50,
    callback: function (value, oldValue, numberBar) {
      var newQcount = Math.max(1,Math.round(value*50));
      numberBar.text = newQcount;
      Save(scene,'qcount', newQcount);
    }
  })

  var langCtrl = scene.rexUI.add.sizer({
    orientation: 'x',
    space: { left: 10, right: 10, top: 10, bottom: 10, item: 30 },
  })
  .addBackground(scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK))
  .add(CreateActionLabel(scene, '語系', 'qcnt'),{})
  .add(CreateButtons(scene), {
    proportion: 1, align: 'left', expand: true,
  })

  mainPanel
    .add(seCtrl, {
      proportion: 1, align: 'left', expand: true,
      key: 'seCtrl'
    })
    .add(qcntCtrl, {
      proportion: 1, align: 'left', expand: true,
      key: 'qcntCtrl'
    })
    .add(langCtrl, {
      proportion: 1, align: 'center', expand: true,
      key: 'langCtrl'
    })

  return mainPanel;
}

var CreateActionLabel = function (scene, text, img, radius, pos) {
  return scene.rexUI.add.label({
    background: CreateRoundRectangleBackground(scene, radius, undefined, 0xffffff, 2),
    icon: !img ? undefined : scene.add.image(0, 0, img).setDisplaySize(72, 72),
    text: !text ? undefined : scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: Style.fontFamilyName, fontSize: 60 }),
    space: { left: 10, right: 10, top: 10, bottom: 10, icon: 0 },
    align: 'center'
  });
}

var CreateNumberBar = function (scene, config) {
  return scene.rexUI.add.numberBar({
    //x: 400,
    //y: 300,
    width: 300, // Fixed width
    background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK),
    icon: CreateActionLabel(scene, config.iconText, config.iconImageKey),
    slider: {
        // width: 120, // Fixed width
        height: 16, //這邊的height控制track的height
        track: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 16, COLOR_PRIMARY),
        indicator: scene.rexUI.add.roundRectangle(0, 0, 0, 16, 16, COLOR_LIGHT), //indicator可填入高度。color:#992d0d
        thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 64, 32, 0xb3340f), //thumb寬高可自訂不受影響。color:#b3340f
        input: 'drag',
    },
    value: config.value,
    text: CreateActionLabel(scene, Math.round(config.value*100)+'%').layout().setMinWidth(50*3),
    space: { left: 10, right: 10, top: 10, bottom: 10, icon: 10, slider: 10 },
    valuechangeCallback: config.callback,
})
}

var CreateButtons = function(scene,config){
  var langOptions = GetValue(config, 'langOptions', ['zh','en','jp']);
  var buttons = [];
  for (var i = 0, cnt = langOptions.length; i < cnt; i++) {
      var btn = CreateActionLabel(scene, langOptions[i]);
      btn.name = langOptions[i];
      buttons.push(btn);
  }
  //fixWidthButtons可以自動換行排列button
  var choices = scene.rexUI.add.buttons({
      //align: 'justify',
      //justifyPercentage: 1,
      // justify在rexUI中的規則是：當該行元素超過justifyPercentage時自動換行，否則左右對齊
      space: { line: 30, item: 30 },
      expand: true,
      type: 'radio',
      buttons: buttons,
      setValueCallback: function (button, value, previousValue) {
        //value是true|false值，radio會在按下按鈕後觸發所有buttons的setValuecallback，所以需要判斷後處理
        //數值處理
        if(value){
          Save(scene,'appLangAlias', button.name);
        }
        //外觀處理
        button.getElement('background')
            .setFillStyle((value) ? 0x8B4513 : undefined) 
      },
  })
  choices.value = GetValue(config, 'appLangAlias', 'zh');
  //choices.setButtonEnable(2, false);//關閉第2個選項
  return choices;
}

export default CreateSettingsPanel;