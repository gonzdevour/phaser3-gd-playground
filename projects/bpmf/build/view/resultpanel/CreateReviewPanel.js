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

  var mainPanel = scene.rexUI.add.sizer({
    orientation: 'x',
    space: { item: 30 }
  })

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
    mouseWheelScroller: {
      focus: false,
      speed: 1,
    },
    space: { left: 10, right: 10, top: 10, bottom: 10, panel: 10,}
  })
    .layout()
  //.drawBounds(this.add.graphics(), 0xff0000);
  //因為這裡還沒完成modal的排版，所以drawBounds時未定位。要在modal時drawBounds才能正確顯示彈出時的狀態

  //依wrongList建立詞
  var sizer = scrollablePanel.getElement('panel');
  //var wrongList = GetValue(config, 'wrongList');
  var wrongList = [
    {
        "word": "意義",
        "character": "義"
    },
    {
        "word": "美好",
        "character": "美"
    },
    {
        "word": "豬八戒",
        "character": "八"
    },
    {
        "word": "拜訪",
        "character": "訪"
    },
    {
        "word": "答應",
        "character": "答"
    },
    {
        "word": "古代",
        "character": "代"
    },
    {
        "word": "哪裡",
        "character": "裡"
    },
    {
        "word": "課文",
        "character": "文"
    },
    {
        "word": "澆水",
        "character": "澆"
    },
    {
        "word": "建築物",
        "character": "建"
    },
    {
        "word": "無論",
        "character": "無"
    },
    {
        "word": "尋找",
        "character": "尋"
    },
    {
        "word": "臭屁",
        "character": "臭"
    },
    {
        "word": "麻煩",
        "character": "煩"
    },
    {
        "word": "什麼",
        "character": "什"
    },
    {
        "word": "多久",
        "character": "久"
    },
    {
        "word": "工匠",
        "character": "匠"
    },
    {
        "word": "安全",
        "character": "全"
    },
  ]

  var wrongListButtonsArray = [];

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
        console.log('areaover' + key);
      })
    */
    var txtLabel = CreateTextLabel(scene, newStr);
    txtLabel.wordTxt = element.word; 
    RegisterLabelAsButton(txtLabel,'button.showWord',mainPanel);

    //將詞加入panel(fixWidthSizer)
    //sizer.add(txtLabel);

    //將詞加入button array
    wrongListButtonsArray.push(txtLabel);

  });


  //fixWidthButtons可以自動換行排列button
  var wrongListButtons = scene.rexUI.add.fixWidthButtons({
    //align: 'justify',
    //justifyPercentage: 1,
    // justify在rexUI中的規則是：當該行元素超過justifyPercentage時自動換行，否則左右對齊
    space: { line: 30, item: 30 },
    type: 'radio',
    buttons: wrongListButtonsArray,
    setValueCallback: function (button, value, previousValue) {
        button.getElement('background')
            .setFillStyle((value) ? 0x8B4513 : undefined)
    },
  })

  sizer.add(wrongListButtons);

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

  //建立詞
  //Style指定
  var wordConfig = {
    orientation: 'y',
    background: CreateRoundRectangleBackground(scene, 10, 0x111111, 0xffffff, 2),
    space: { left: 30, right: 0, top: 0, bottom: 0, item: 0 },
    style: GetValue(Style, 'quizPanel'),
    maxCharacters: 4, //1個詞最多支援4個字
    characters: [],
  }
  var word = CreateWord(scene, wordConfig);

  mainPanel
    .add(word,{
      proportion: 0, align: 'center', expand: true,
      key: 'word'      
    })
    .add(scrollablePanel,{
      proportion: 1, align: 'center', expand: true,
      key: 'scrollablePanel'
    })
    .on('button.showWord', function(gameObject, pointer, event){
      //var txt = gameObject.getElement('text').getPlainText();

      //if (!gameObject.getTopmostSizer().isInTouching()) {
      //  return;
      //}
      var txt = gameObject.wordTxt;
      console.log(txt)
      var wordChars = scene.model.currentDB.words.queryWord(txt)[0].getCharacters();
      mainPanel.getElement('word').setWord(wordChars).layout();
    })

  return mainPanel;
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