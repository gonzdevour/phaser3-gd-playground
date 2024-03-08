import CreateRoundRectangleBackground from '../../../templates/CreateRoundRectangleBackground.js';
import Style from '../../../../settings/Style.js';
import GetValue from 'gdkPlugins/utils/object/GetValue.js';

const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

var CreateLogPanel = function (scene, logData) {

  var viewport = scene.scenario.director.viewport;
  logData = logData?logData:[];

  var mainPanel = scene.rexUI.add.sizer({
    orientation: 'x',
    space: { item: 30 },
    sizerEvents: true,
  })
  .on('postlayout', function(){
    scene.log('mainPanel postlayout')
  })
  .setMinSize(viewport.width-50, viewport.height*0.7)

  //建立scrollablePanel+fixWidthSizer
  var scrollablePanel = scene.rexUI.add.scrollablePanel({
    //x: viewport.centerX, y: viewport.centerY, 
    //width: viewport.width-100, 
    height: viewport.height * 0.6,
    scrollMode: 0,
    background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
    panel: {
      child: scene.rexUI.add.sizer({
        orientation: 'y',
        space: { left: 0, right: 0, top: 0, bottom: 0, item: 10, line: 10, },
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
    space: { left: 10, right: 10, top: 10, bottom: 10, panel: 10, },
  })
  .once('sizer.postlayout', function(child, sizer){
    scene.log('scrollablePanel postlayout');
    child.scrollToBottom();
    //因為scrollablePanel沒有給size，size只有最上層的modalDialog有傳入，所以當layout完成後，再次layout子sizer(scrollablePanel)，
    //會因為沒有預設size而以min size 0*0為基準來重新layout，大小就會與跟著modalDialog一起建立的scrollablePanel不同。
    //解決：在mainPanel啟動sizerEvents後可掛上layout完成事件，完成後將大小設為min size，之後layout這區域時才能使用proportion
    //child.setMinSize(child.width, child.height);
  })
  //.layout()
  //.drawBounds(this.add.graphics(), 0xff0000);
  //因為這裡還沒完成modal的排版，所以drawBounds時未定位。要在modal時drawBounds才能正確顯示彈出時的狀態

  //依list建立詞
  var sizer = scrollablePanel.getElement('panel')

  logData.forEach(function (element, index, arr) {
    // 這裡可以有幾種變化：
    // var msgAlign = element['logSideIdx']==0?'left':'right'; //只要換人講話就切換位置
    // var msgAlign = element['logType']=='host'?'right':'left'; //模仿messenger，只有玩家講話在右側，其餘在左側
    var msgAlign = element['logSideIdx']==0?'left':'right';
    var logSizer = CreateLogSizer(scene, viewport, msgAlign, element);
    sizer.add(logSizer, {align: msgAlign});

  });

  mainPanel
    .add(scrollablePanel, {
      proportion: 1, align: 'center', expand: true,
      key: 'scrollablePanel'
    })
    .once('postlayout', function (children, sizer) {
      mainPanel.setMinSize(mainPanel.width, mainPanel.height);
    })

  return mainPanel;
}

/* 
logData:{
  logType: 'story'|'host'|'actor'|'choice', //故事|玩家|角色|選擇
  logColor: 0x0, //代表色
  logSideIdx: logSideIdx, //log排列位置編號，例：1靠左，0靠右
  logIsHeader: ifDifferentTalker, //true: 此log為該說話者的第一個log
  logIsFooter: undefined | true //true: 此log為該說話者的最後一個log(注意同一log可能既是header也是footer)
  actorID:actorID, 
  displayName: displayName, 
  expression: expression, 
  serif: serif
} 
*/

var CreateLogSizer = function (scene, viewport, msgAlign, logData) {
  var sizer = scene.rexUI.add.sizer({
    orientation: 'x',
    rtl: msgAlign=='right'?true:false,
    space: { left:0, right: 0, top: 0, bottom: 0, item: 5, }
  });
  var portrait = scene.add.image(0, 0, 'ico_user').setDisplaySize(90, 90)
  if (!logData['logIsHeader']){
    portrait.setVisible(false);
  }
  sizer.add(portrait, {align: 'top'})
  sizer.add(CreateNamedText(scene, viewport, msgAlign, logData))

  return sizer;
}

var CreateNamedText = function (scene, viewport, msgAlign, logData) {
  var sizer = scene.rexUI.add.sizer({
    orientation: 'y',
    space: { left:0, right: 0, top: 0, bottom: 0 }
  })
  if (logData['logIsHeader']){
    sizer.add(CreateNameLabel(scene, logData), {align: msgAlign, space:{top:20}})
  }
  sizer.add(CreateTextLabel(scene, viewport, msgAlign, logData))

  return sizer;
}

var CreateTextLabel = function (scene, viewport, msgAlign, logData) {

  var tl,tr,bl,br
  if (logData.logIsHeader){
    tl = 20;
    tr = 20;
  }
  if (logData.logIsFooter){
    bl = 20;
    br = 20;
  }
  if (!logData.logIsHeader){
    tl = 10;
    tr = 10;
  }
  if (!logData.logIsFooter){
    bl = 10;
    br = 10;
  }

  var bgRadius = {
    tl: tl,
    tr: tr,
    bl: bl,
    br: br
  }
  var logColor = Number('0x' + GetValue(logData, 'logColor', 0)) //canvas只吃數字style
  return scene.rexUI.add.label({
    background: CreateRoundRectangleBackground(scene, bgRadius, logColor, 0xffffff, 2),
    // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
    text: scene.rexUI.add.BBCodeText(0, 0, GetValue(logData, 'serif', ''), { 
      fontFamily: Style.fontFamilyName, 
      fontSize: 24,
      testString: '|MÉqgy回',
      wrap: {
        mode: 'character',  // 0|'none'|1|'word'|2|'char'|'character'
        width: viewport.width*0.5,
      },
    }),
    align: 'center',
    space: { left:20, right: 20, top: 20, bottom: 20 } //text在label中的天地
  });
}

var CreateNameLabel = function (scene, logData) {
  return scene.rexUI.add.label({
    //background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
    // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
    text: scene.rexUI.add.BBCodeText(0, 0, GetValue(logData, 'displayName', ''), { 
      fontFamily: Style.fontFamilyName, 
      fontSize: 24,
      color: 0xffffff,
      testString: '|MÉqgy回',
    }),
    align: 'left',
    space: { left:10, right: 10, top: 10, bottom: 10 } //text在label中的天地
  });
}

var CreateActionLabel = function (scene, text, img, radius, pos) {
  return scene.rexUI.add.label({
    background: CreateRoundRectangleBackground(scene, radius, undefined, 0xffffff, 2),
    icon: !img ? undefined : scene.add.image(0, 0, img).setDisplaySize(72, 72),
    text: !text ? undefined : scene.rexUI.add.BBCodeText(0, 0, text, { 
      fontFamily: Style.fontFamilyName, 
      fontSize: 60,
      testString: '|MÉqgy回',
    }),
    space: { left: 10, right: 10, top: 10, bottom: 10, icon: 0 }
  });
}

export default CreateLogPanel;