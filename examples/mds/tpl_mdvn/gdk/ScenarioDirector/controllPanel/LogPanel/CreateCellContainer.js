import Style from '../../../../settings/Style.js';
import GetValue from 'gdkPlugins/utils/object/GetValue.js';
import getBackgroundgRadius from './LogStyle/getBackgroundgRadius.js';

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

var CreateCellContainer = function (scene, viewport, msgAlign, logData) {
  return scene.rexUI.add.sizer({
  })
  .add(CreateLogSizer(scene, viewport, msgAlign, logData), {align: msgAlign, key:'logSizer'})
}

var CreateLogSizer = function (scene, viewport, msgAlign, logData) {
  var logType = GetValue(logData, 'logType', undefined);
  var space = logType == 'story'? { left:0, right: 0, top: 50, bottom: 50, item: 5, } : { left:0, right: 0, top: 0, bottom: 0, item: 5, } ;
  var sizer = scene.rexUI.add.sizer({
    orientation: 'x',
    rtl: msgAlign=='right'?true:false,
    space: space,
  });
  //var portrait = scene.add.image(0, 0, 'ico_user').setDisplaySize(90, 90);
  var portrait = scene.rexUI.add.circleMaskImage(0, 0, 'ico_user', 0, {maskType:'circle'}).setDisplaySize(90, 90);
  sizer.add(portrait, {align: 'top', key:'portrait'})
  sizer.add(CreateNamedText(scene, viewport, msgAlign, logData), {key:'namedText'})

  return sizer;
}

var CreateNamedText = function (scene, viewport, msgAlign, logData) {
  var sizer = scene.rexUI.add.sizer({
    orientation: 'y',
    space: { left:0, right: 0, top: 0, bottom: 0 }
  })
  sizer.add(CreateNameLabel(scene, logData), {align: msgAlign, space:{top:20}, key:'nameLabel'})
  sizer.add(CreateTextLabel(scene, viewport, msgAlign, logData), {key: 'textLabel'})

  return sizer;
}

var CreateTextLabel = function (scene, viewport, msgAlign, logData) {
  var bgRadius = getBackgroundgRadius(logData);
  var logColor = Number('0x' + GetValue(logData, 'logColor', 0)); //canvas只吃數字style
  var logType = GetValue(logData, 'logType', undefined);
  var wrapWidth = logType == 'story'? viewport.width*0.75 : viewport.width*0.5;
  return scene.rexUI.add.label({
    background: CreateSpeechBubbleShape(scene, bgRadius, logColor, 0xffffff, 2, logData),
    // background: CreateRoundRectangleBackground(scene, bgRadius, logColor, 0xffffff, 2),
    // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
    text: scene.rexUI.add.BBCodeText(0, 0, GetValue(logData, 'serif', ''), { 
      fontFamily: Style.fontFamilyName, 
      fontSize: 24,
      testString: '|MÉqgy回',
      wrap: {
        mode: 'character',  // 0|'none'|1|'word'|2|'char'|'character'
        width: wrapWidth,
      },
      padding: 10,
    }),
    align: 'center',
    space: { left:20, right: 20, top: 10, bottom: 10 } //text在label中的天地
  });
}

var CreateSpeechBubbleShape = function (scene, bgRadius, fillColor, strokeColor, lineWidth, item) {
  return scene.rexUI.add.customShapes({
      create: { lines: 1 }
  })
  .setData('bgRadius', bgRadius)
  .setData('fillColor', fillColor)
  .setData('strokeColor', strokeColor)
  .setData('lineWidth', lineWidth)
  .setData('item', item)  //可以用DataManager傳入參數，待callback時再從customShape取出使用
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

export default CreateCellContainer;