import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import { Style } from '../style/style.js';
import CreateWord from '../quizpanel/CreateWord.js';

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
    background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
    panel: {
        child: scene.rexUI.add.fixWidthSizer({
            space: { left: 10, right: 10, top: 30, bottom: 10, item: 10, line: 10, }}
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
      threshold: 10,
      slidingDeceleration: 5000,
      backDeceleration: 5000,
      pointerOutRelease: false,
    },
    space: { left: 10, right: 10, top: 10, bottom: 10, panel: 10,}
  })
    .layout()
  //.drawBounds(this.add.graphics(), 0xff0000);

  //依wrongList建立詞
  var sizer = scrollablePanel.getElement('panel');
  var wrongList = GetValue(config, 'wrongList');

  //Style指定
  var wordConfig = {
    orientation: 'y',
    background: CreateRoundRectangleBackground(scene),
    space: { left: 0, right: 0, top: 0, bottom: 0, item: 0 },
    style: GetValue(Style, 'reviewPanel'),
    maxCharacters: 4, //1個詞最多支援4個字
    characters: [],
}

  wrongList.forEach(element => {
/*     var word = CreateWord(scene, wordConfig)
    .setWord([
        { character: '注', initials: 'ㄓ', media: 'ㄨ', vowel: '', tone: 'ˋ' },
    ]) */
    var word = scene.rexUI.add.BBCodeText(0, 0, element.character, { 
      fontFamily: 'DFKai-SB', 
      fontSize: 60,
}
      );
    console.log(element);
    sizer.add(word);
  });

  //排版
  sizer.layout();
  //sizer.drawBounds(scene.add.graphics(), 0xff0000);
  
  return scrollablePanel;
}

export default CreateReviewPanel;