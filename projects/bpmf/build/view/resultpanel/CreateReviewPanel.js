import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import { Style } from '../style/style.js';
import CreateWord from '../quizpanel/CreateWord.js';
import RegisterLabelAsButton from '../../../behavior/Button/RegisterLabelAsButton.js';

//utils
import GetValue from '../../../../../plugins/utils/object/GetValue.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

var CreateReviewPanel = function (scene, config) {
  //建立scrollablePanel+fixWidthSizer
  var scrollablePanel = scene.rexUI.add.scrollablePanel({
    //x: 400, y: 300, 
    //width: scene.viewport.width-100, 
    height: scene.viewport.height*0.6,
    scrollMode: 0,
    background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2), // #ffffff
    panel: {
        child: scene.rexUI.add.fixWidthSizer({
            space: { left: 10, right: 10, top: 30, bottom: 10, item: 30, line: 20, },
          }
        ),
        mask: {
            padding: 1
        },
    },
    slider: {
        track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
        thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
    },
    scroller: {
      threshold: 5,
      slidingDeceleration: 5000,
      backDeceleration: 5000,
      pointerOutRelease: false,
    },
    space: { left: 10, right: 10, top: 10, bottom: 10, panel: 10,}
  })
    .layout()
  //.drawBounds(this.add.graphics(), 0xff0000);
  //因為這裡還沒完成modal的排版，所以drawBounds時未定位。要在modal時drawBounds才能正確顯示彈出時的狀態

  //依wrongList建立詞
  var sizer = scrollablePanel.getElement('panel');
  var wrongList = GetValue(config, 'wrongList');

  wrongList.forEach(function(element, index, arr){
    //建立縱向字串
    var newStr = '';
    for (var i = 0; i < element.word.length; i++) {
      newStr = newStr + (i==0?'':'\n') + element.word.charAt(i);
    }
    //將詞內指定字著色
    newStr = newStr.replace(element.character,'[color=chocolate]' + element.character + '[/color]');
    //給予area
    newStr = `[area=${element.word}]` + newStr + `[/area]`;
    //以字串建立bbcode詞
    /* 
    var word = scene.rexUI.add.BBCodeText(0, 0, newStr, { fontFamily: 'DFKai-SB', fontSize: 72 })
      .setInteractive()
      .on('areaover', function (key) {
        console.log(key);
      })
    */
    var txtLabel = CreateTextLabel(scene, newStr);
    RegisterLabelAsButton(txtLabel,'button.showWord',scrollablePanel);

    //將詞加入panel(fixWidthSizer)
    sizer.add(txtLabel);
  });

  /*
  wrongList.forEach(function(element, index, arr){
    //Style指定
    var wordConfig = {
      orientation: 'y',
      background: CreateRoundRectangleBackground(scene, 10, 0x111111, 0xffffff, 2),
      space: { left: 0, right: 0, top: 0, bottom: 0, item: 0 },
      style: GetValue(Style, 'reviewPanel'),
      maxCharacters: 4, //1個詞最多支援4個字
      characters: [],
    }
    console.log(element.word);
    //建立詞
    var word = CreateWord(scene, wordConfig)
      .setWord(scene.model.currentDB.words.queryWord(element.word)[0].getCharacters()) //queryWord取回array，所以一定要給index才能拿到Word物件
    //將詞加入panel(fixWidthSizer)
    sizer.add(word);
  });
  */

  //排版
  scrollablePanel.layout();
  scrollablePanel.on('button.showWord', function(gameObject, pointer, event){ //function(button, gameObject, pointer, event)
    console.log(gameObject.getElement('text').getPlainText())
  })
  
  return scrollablePanel;
}

var CreateTextLabel = function (scene, text) {
  return scene.rexUI.add.label({
      background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),
      // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
      text: scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 72 }),
      align: 'center',
      space: { top: 20, bottom: 20 } //text在label中的天地
  });
}

export default CreateReviewPanel;