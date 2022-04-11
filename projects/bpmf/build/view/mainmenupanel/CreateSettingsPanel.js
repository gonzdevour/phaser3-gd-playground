import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import { Style } from '../style/style.js';
import RegisterLabelAsButton from '../../../behavior/Button/RegisterLabelAsButton.js';

//utils
import GetValue from '../../../../../plugins/utils/object/GetValue.js';
import { DefaultSettings } from '../../../model/DefaultData.js';

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
  .on('postlayout', function(){
    scene.log('mainPanel postlayout')
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
    scene.model.sound.play(scene, 'right');
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

  mainPanel
    .add(seCtrl, {
      proportion: 1, align: 'left', expand: true,
      key: 'seCtrl'
    })
    .add(qcntCtrl, {
      proportion: 1, align: 'left', expand: true,
      key: 'qcntCtrl'
    })

  return mainPanel;
}

var Save = function (scene, key, newValue) {
  let savingConfig = {};
  savingConfig[key] = newValue;
  scene.model.appData.save(savingConfig);
}

var CreateActionLabel = function (scene, text, img, radius, pos) {
  return scene.rexUI.add.label({
    background: CreateRoundRectangleBackground(scene, radius, undefined, 0xffffff, 2),
    icon: !img ? undefined : scene.add.image(0, 0, img).setDisplaySize(72, 72),
    text: !text ? undefined : scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 }),
    space: { left: 10, right: 10, top: 10, bottom: 10, icon: 0 }
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
        height: 64,
        track: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 32, COLOR_PRIMARY),
        indicator: scene.rexUI.add.roundRectangle(0, 0, 0, 64, 32, COLOR_LIGHT),
        thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 64, 32, 0xff3333),
        input: 'drag',
    },
    value: config.value,
    text: CreateActionLabel(scene, Math.round(config.value*100)+'%').layout().setMinWidth(50*3),
    space: { left: 10, right: 10, top: 10, bottom: 10, icon: 10, slider: 10 },
    valuechangeCallback: config.callback,
})
}

export default CreateSettingsPanel;