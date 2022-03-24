import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import { Style } from '../style/style.js';
import CreateWord from '../quizpanel/CreateWord.js';
import RegisterLabelAsButton from '../../../behavior/Button/RegisterLabelAsButton.js';

//utils
import GetValue from '../../../../../plugins/utils/object/GetValue.js';
import ArrRemoveItemIfKeyExist from '../../../../../plugins/utils/array/ArrRemoveItemIfKeyExist.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

var CreateReviewPanel = function (scene, config) {

  var mainPanel = scene.rexUI.add.sizer({
    orientation: 'x',
    space: { item: 30 },

    sizerEvents: true
  })

  //建立scrollablePanel+fixWidthSizer
  var scrollablePanel = scene.rexUI.add.scrollablePanel({
    //x: 400, y: 300, 
    //width: scene.viewport.width-100, 
    height: scene.viewport.height * 0.6,
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
      track: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_DARK),
      thumb: scene.rexUI.add.roundRectangle(0, 0, 10, 90, 10, COLOR_LIGHT),
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
    space: { left: 10, right: 10, top: 10, bottom: 10, panel: 10, }
  })
  //.drawBounds(this.add.graphics(), 0xff0000);
  //因為這裡還沒完成modal的排版，所以drawBounds時未定位。要在modal時drawBounds才能正確顯示彈出時的狀態

  //依wrongList建立詞
  var sizer = scrollablePanel.getElement('panel');
  var wrongList = GetValue(config, 'wrongList');

  var wrongListButtonsArray = [];

  wrongList.forEach(function (element, index, arr) {
    //建立縱向字串
    var newStr = '';
    for (var i = 0; i < element.word.length; i++) {
      newStr = newStr + (i == 0 ? '' : '\n') + element.word.charAt(i);
    }
    //將詞內指定字著色
    newStr = newStr.replace(element.character, '[color=chocolate]' + element.character + '[/color]');
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
    RegisterLabelAsButton(txtLabel, 'button.showWord', mainPanel);

    //將詞加入button array，給fixWidthButton用(目前關閉)
    //wrongListButtonsArray.push(txtLabel);

    //將詞加入panel(fixWidthSizer)
    sizer.add(txtLabel);

  });

  /* 
  //fixWidthButtons可以自動換行排列button
  var wrongListButtons = scene.rexUI.add.buttons({
    //align: 'justify',
    //justifyPercentage: 1,
    // justify在rexUI中的規則是：當該行元素超過justifyPercentage時自動換行，否則左右對齊
    //space: { line: 30, item: 30 },
    type: 'radio',
    buttons: wrongListButtonsArray,
    setValueCallback: function (button, value, previousValue) {
        button.getElement('background')
            .setFillStyle((value) ? 0x8B4513 : undefined)
    },
  })

  sizer.add(wrongListButtons);
  */
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

  var wordPanel = scene.rexUI.add.sizer({
    orientation: 'y',
    space: { item: 30 }
  })

  var btnSearch = CreateActionLabel(scene, '搜尋', undefined, 20);
  var btnDelete = CreateActionLabel(scene, '刪除', undefined, 20);
  RegisterLabelAsButton(btnSearch, 'button.searchWord', mainPanel);
  RegisterLabelAsButton(btnDelete, 'button.deleteWord', mainPanel);

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

  wordPanel
    .add(word, {
      proportion: 0, align: 'center', expand: true,
      key: 'word'
    })
    .add(btnSearch, {
      proportion: 0, align: 'center', expand: true,
      key: 'btnSearch'
    })
    .add(btnDelete, {
      proportion: 0, align: 'center', expand: true,
      key: 'btnDelete'
    })

  mainPanel
    .add(wordPanel, {
      proportion: 0, align: 'center', expand: true,
      key: 'wordPanel'
    })
    .add(scrollablePanel, {
      proportion: 1, align: 'center', expand: true,
      key: 'scrollablePanel'
    })
    .on('button.showWord', function (gameObject, pointer, event) {
      if (mainPanel.buttonLastShowed != undefined) {
        mainPanel.buttonLastShowed.getElement('background').setFillStyle(undefined);
      }
      mainPanel.buttonLastShowed = gameObject;
      mainPanel.buttonLastShowed.getElement('background').setFillStyle(0x8B4513);

      //var txt = gameObject.getElement('text').getPlainText();

      /* 
      var topMostSizer = gameObject.getTopmostSizer();
      var isInTouching = topMostSizer.isInTouching();
      if (!gameObject.getTopmostSizer().isInTouching()) {
        debugger;
        return;
      }
      */
      btnSearch.wordTxt = gameObject.wordTxt;
      btnDelete.wordTxt = gameObject.wordTxt;
      btnDelete.wordLabel = gameObject;
      var txt = gameObject.wordTxt;
      console.log(txt)
      var wordChars = scene.model.currentDB.words.queryWord(txt)[0].getCharacters();
      mainPanel.getElement('wordPanel.word').setWord(wordChars).layout();
    })
    .on('button.searchWord', function (gameObject, pointer, event) {
      if (gameObject.wordTxt != undefined) {
        var url = 'https://dict.revised.moe.edu.tw/search.jsp?md=1&word=' + gameObject.wordTxt;
        window.open(url, '_blank').focus();
      }
    })
    .on('button.deleteWord', function (gameObject, pointer, event) {
      if (gameObject.wordTxt != undefined) {
        //ArrRemoveItemIfKeyExist(wrongList,{'word':gameObject.wordTxt},'word');
        //sizer.remove(gameObject.wordLabel);
        mainPanel.layout();
      }
    })
    .once('postlayout', function (children, sizer) {
      mainPanel.setMinSize(mainPanel.width, mainPanel.height);
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

var CreateActionLabel = function (scene, text, img, radius, pos) {
  return scene.rexUI.add.label({
    background: CreateRoundRectangleBackground(scene, radius, undefined, 0xffffff, 2),
    icon: !img ? undefined : scene.add.image(0, 0, img).setDisplaySize(90, 90),
    text: !text ? undefined : scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 }),
    space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 }
  });
}

export default CreateReviewPanel;