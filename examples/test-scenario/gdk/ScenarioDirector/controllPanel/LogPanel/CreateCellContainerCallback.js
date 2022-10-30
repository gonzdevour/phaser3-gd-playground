import CreateRoundRectangleBackground from '../../../templates/CreateRoundRectangleBackground.js';
import Style from '../../../../settings/Style.js';
import GetValue from '../../../../../../plugins/utils/object/GetValue.js';

/* 
cell.item:{
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

var CreateCellContainerCallback = function (cell, cellContainer) {
  var scene = cell.scene, 
      width = cell.width, 
      item = cell.item,
      index = cell.index, 
      viewport = scene.scenario.director.viewport,
      // 這裡可以有幾種變化：
      // var msgAlign = item['logSideIdx']==0?'left':'right'; //只要換人講話就切換位置
      // var msgAlign = item['logType']=='host'?'right':'left'; //模仿messenger，只有玩家講話在右側，其餘在左側
      msgAlign = item['logSideIdx']==0?'left':'right';

  if (cellContainer === null) {
      cellContainer = CreateCellContainer(scene, viewport, msgAlign, item).setOrigin(0);
      console.log(cell.index + ': create new cell-container');
  } else {
      console.log(cell.index + ': reuse cell-container');
  }

  var logSizer = cellContainer.getElement('logSizer');
  var nameLabel = cellContainer.getElement('logSizer.namedText.nameLabel');
  var portrait = cellContainer.getElement('logSizer.portrait');
  var background = cellContainer.getElement('logSizer.namedText.textLabel.background');
  var contentText = cellContainer.getElement('logSizer.namedText.textLabel.text');
  var titleText = cellContainer.getElement('logSizer.namedText.nameLabel.text');

  if (item['logIsHeader']){
    cellContainer.show(nameLabel);
    cellContainer.setChildVisible(portrait, true);
  } else {
    cellContainer.hide(nameLabel);
    cellContainer.setChildVisible(portrait, false);
  }

  if (item['logType'] == 'choice'){
    portrait.setTexture('ico_yes');
  }
  if (item['logType'] == 'host'){
    portrait.setTexture('ico_no');
  }
  if (item['logType'] == 'actor'){
    portrait.setTexture('ico_user');
  }

  contentText.setText(GetValue(item, 'serif', ''))
  titleText.setText(GetValue(item, 'displayName', ''))

  var bgRadius = getBackgroundgRadius(item);
  var logColor = Number('0x' + GetValue(item, 'logColor', 0)); //canvas只吃數字style

  background
    .setData('bgRadius', bgRadius)
    .setData('fillColor', logColor)
    .setData('strokeColor', 0xffffff)
    .setData('lineWidth', 2)
    .setData('item', item)  //可以用DataManager傳入參數，待callback時再從customShape取出使用
  background.setUpdateShapesCallback( msgAlign=='right' ? RightTailBubble : LeftTailBubble );
  logSizer.setRTL(msgAlign=='right'?true:false);
  cellContainer.setChildAlign(nameLabel, msgAlign);
  //nameLabel.rexSizer.align = msgAlign=='right'?2:0; //0左1中2右

  cellContainer
      .setDirty(true).layout()  // Run layout manually
      .setDirty(false)          // Don't run layout again

  cell.height = cellContainer.height + 10;
  cell.setCellContainerAlign(msgAlign);

  return cellContainer;
}

var getBackgroundgRadius = function(item){
  var tl,tr,bl,br
  if (item.logIsHeader){
    tl = 20;
    tr = 20;
  }
  if (item.logIsFooter){
    bl = 20;
    br = 20;
  }
  if (!item.logIsHeader){
    tl = 10;
    tr = 10;
  }
  if (!item.logIsFooter){
    bl = 10;
    br = 10;
  }
  return { tl: tl, tr: tr, bl: bl, br: br };
}

var CreateCellContainer = function (scene, viewport, msgAlign, logData) {
  return scene.rexUI.add.sizer({
  })
  .add(CreateLogSizer(scene, viewport, msgAlign, logData), {align: msgAlign, key:'logSizer'})
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

var LeftTailBubble = function () {
  var fillColor = this.getData('fillColor');
  var strokeColor = this.getData('strokeColor');
  var radius = this.getData('bgRadius'); //20;
  var lineWidth = this.getData('lineWidth');
  var item = this.getData('item');

  var isHeader = item['logIsHeader'];
  var isSpeaker = false;
  if (item['logType'] == 'host' || item['logType'] == 'actor'){
    isSpeaker = true;
  }

  var tailWidth = 20; //尾巴寬度
  var tailHeight = 16 //尾巴高度
  var left = 0 + tailWidth, right = this.width - tailWidth,
      top = 0, bottom = this.height;
  
  var shape = this.getShapes()[0];
  shape
    .lineStyle(lineWidth, strokeColor, 1) //lineWidth, strokeColor, alpha
    .fillStyle(fillColor, 1) //fillColor, alpha
    // top line, right arc
    .startAt(left + radius.tl, top).lineTo(right - radius.tr, top).arc(right - radius.tr, top + radius.tr, radius.tr, 270, 360)
    // right line, bottom arc
    .lineTo(right, bottom - radius.br).arc(right - radius.br, bottom - radius.br, radius.br, 0, 90)
    // bottom line, left arc
    .lineTo(left + radius.bl, bottom).arc(left + radius.bl, bottom - radius.bl, radius.bl, 90, 180)
  if (isHeader && isSpeaker){
    shape
    .lineTo(left, bottom - 0.5*this.height + 0.5*tailHeight) //tail start
    .lineTo(left - tailWidth, bottom - 0.7*this.height) //tail center
    .lineTo(left, bottom - 0.5*this.height - 0.5*tailHeight) //tail end
  }
  shape //left line, top arc
    .lineTo(left, top + radius.tl).arc(left + radius.tl, top + radius.tl, radius.tl, 180, 270)
    .close();
}

var RightTailBubble = function () {
  var textLabel = this.scene.rexUI.getParentSizer(this);

  var fillColor = this.getData('fillColor');
  var strokeColor = this.getData('strokeColor');
  var radius = this.getData('bgRadius'); //20;
  var lineWidth = this.getData('lineWidth');
  var item = this.getData('item');

  var isHeader = item['logIsHeader'];
  var isSpeaker = false;
  if (item['logType'] == 'host' || item['logType'] == 'actor'){
    isSpeaker = true;
  }

  var tailWidth = 20; //尾巴寬度
  var tailHeight = 16; //尾巴高度

  var left = 0 + tailWidth, right = this.width - tailWidth,
      top = 0, bottom = this.height;
  var shape = this.getShapes()[0];
  shape
    .lineStyle(lineWidth, strokeColor, 1) //lineWidth, strokeColor, alpha
    .fillStyle(fillColor, 1) //fillColor, alpha
    // top line, right arc
    .startAt(left + radius.tl, top).lineTo(right - radius.tr, top).arc(right - radius.tr, top + radius.tr, radius.tr, 270, 360)
  if (isHeader && isSpeaker){
    shape
    .lineTo(right, bottom - 0.5*this.height - 0.5*tailHeight) //tail start
    .lineTo(right + tailWidth, bottom - 0.7*this.height) //tail center
    .lineTo(right, bottom - 0.5*this.height + 0.5*tailHeight) //tail end
  }
  shape
    .lineTo(right, bottom - radius.br).arc(right - radius.br, bottom - radius.br, radius.br, 0, 90)
    // bottom line, left arc
    .lineTo(left + radius.bl, bottom).arc(left + radius.bl, bottom - radius.bl, radius.bl, 90, 180)
    // left line, top arc
    .lineTo(left, top + radius.tl).arc(left + radius.tl, top + radius.tl, radius.tl, 180, 270)
    .close();
}

var CreateLogSizer = function (scene, viewport, msgAlign, logData) {
  var sizer = scene.rexUI.add.sizer({
    orientation: 'x',
    rtl: msgAlign=='right'?true:false,
    space: { left:0, right: 0, top: 0, bottom: 0, item: 5, },
  });
  var portrait = scene.add.image(0, 0, 'ico_user').setDisplaySize(90, 90);
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
        width: viewport.width*0.5,
      },
      padding: 10,
    }),
    align: 'center',
    space: { left:20, right: 20, top: 10, bottom: 10 } //text在label中的天地
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

export default CreateCellContainerCallback;