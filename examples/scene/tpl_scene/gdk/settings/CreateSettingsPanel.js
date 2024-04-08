import CreateRoundRectangleBackground from '../templates/CreateRoundRectangleBackground.js';
import Style from '../../settings/Style.js';
//utils
import GetValue from 'gdkPlugins/utils/object/GetValue.js';

const COLOR_PRIMARY = 0x111111;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x222222;

var CreateSettingsPanel = function (scene, viewport) {

  var lsData = scene.game.lsData;

  var mainPanel = scene.rexUI.add.sizer({
    orientation: 'y',
    space: { item: 10 },
    sizerEvents: true,
  })
  .on('postlayout', function(child, sizer){
    //scene.log('mainPanel postlayout')
    //scene.drawBounds(sizer);
  })
  //.setMinSize(viewport.width-50, viewport.height*0.7) //加這條可以強制控制content大小

  /*

  //建立語音音量控制(plugin似乎沒提供語音音量控制)
  var speakCtrl = CreateNumberBar(scene,{
    iconText: '語音',
    iconImageKey: 'speak', 
    value: lsData.get('volumeSpeak'),
    callback: function (value, oldValue, numberBar) {
      numberBar.text = Math.round(value*100)+'%';
      lsData.set('volumeSpeak', value);
    }
  })

  */

  //建立音樂音量控制   
  var bgmCtrl = CreateNumberBar(scene,{
    iconText: '音樂',
    iconImageKey: 'ico_music', 
    value: lsData.get('volumeBGM'),
    callback: function (value, oldValue, numberBar) {
      numberBar.text = Math.round(value*100)+'%';
      lsData.set('volumeBGM', value);
    }
  }) 

  //建立音效音量控制
  var seCtrl = CreateNumberBar(scene,{
    iconText: '音效',
    iconImageKey: 'ico_sound', 
    value: lsData.get('volumeSE'),
    callback: function (value, oldValue, numberBar) {
      numberBar.text = Math.round(value*100)+'%';
      lsData.set('volumeSE', value);
    }
  }).on('inputend', function(pointer) {
    scene.game.audio.play('right');
  }, scene);

  var langCtrl = scene.rexUI.add.sizer({
    orientation: 'x',
    space: { left: 10, right: 10, top: 10, bottom: 10, item: 30 },
  })
  .addBackground(scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK))
  .add(CreateActionLabel(scene, '語系', 'ico_lang'),{})
  .add(CreateButtons(scene, lsData), {
    proportion: 1, align: 'left', expand: true,
  })

  mainPanel
    .add(bgmCtrl, {
      proportion: 1, align: 'left', expand: true,
      key: 'bgmCtrl'
    })
    .add(seCtrl, {
      proportion: 1, align: 'left', expand: true,
      key: 'seCtrl'
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
    icon: !img ? undefined : scene.add.image(0, 0, img).setDisplaySize(60, 60),
    text: !text ? undefined : scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: Style.fontFamilyName, fontSize: 48 }),
    space: { left: 10, right: 10, top: 10, bottom: 10, icon: 0 },
    align: 'center'
  });
}

var CreateNumberBar = function (scene, config) {
  return scene.rexUI.add.numberBar({
    //x: 400,
    //y: 300,
    width: scene.viewport.width*0.5, // Fixed width
    background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK),
    icon: CreateActionLabel(scene, config.iconText, config.iconImageKey),
    slider: {
        // width: 120, // Fixed width
        height: 16, //這邊的height控制track的height
        track: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 16, COLOR_PRIMARY),
        indicator: scene.rexUI.add.roundRectangle(0, 0, 0, 16, 16, COLOR_LIGHT), //indicator可填入高度。color:#992d0d
        thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 64, 32, 0xb3340f), //thumb寬高可自訂不受影響。color:#b3340f
        input: 'click',
    },
    value: config.value,
    text: CreateActionLabel(scene, Math.round(config.value*100)+'%').layout().setMinWidth(50*3),
    space: { left: 10, right: 10, top: 10, bottom: 10, icon: 10, slider: 10 },
    valuechangeCallback: config.callback,
})
}

var CreateButtons = function(scene, lsData, config){
  var langOptions = GetValue(config, 'langOptions', ['zh','en','ja']);
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
          lsData.set('appLang', button.name);
        }
        //外觀處理
        button.getElement('background')
            .setFillStyle((value) ? 0x8B4513 : undefined) 
      },
  })

  choices.value = lsData.get('appLang');
  //choices.setButtonEnable(2, false);//關閉第2個選項
  return choices;
}

export default CreateSettingsPanel;