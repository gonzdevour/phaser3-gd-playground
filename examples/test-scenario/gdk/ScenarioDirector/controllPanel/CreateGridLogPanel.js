import CreateRoundRectangleBackground from '../../templates/CreateRoundRectangleBackground.js';
import Style from '../../settings/Style.js';
import GetValue from '../../../../../plugins/utils/object/GetValue.js';

const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

var CreateGridLogPanel = function (scene, logData) {

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

  // var scrollablePanel = scene.rexUI.add.scrollablePanel({
  //   height: viewport.height * 0.6,
  //   scrollMode: 0,
  //   background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
  //   panel: {
  //     child: scene.rexUI.add.sizer({
  //       orientation: 'y',
  //       space: { left: 0, right: 0, top: 0, bottom: 0, item: 10, line: 10, },
  //     }
  //     ),
  //     mask: {
  //       padding: 1
  //     },
  //   },
  //   slider: {
  //     track: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_DARK),
  //     thumb: scene.rexUI.add.roundRectangle(0, 0, 10, 90, 10, COLOR_LIGHT),
  //   },
  //   scroller: {
  //     threshold: 5,
  //     slidingDeceleration: 5000,
  //     backDeceleration: 5000,
  //     pointerOutRelease: false,
  //   },
  //   mouseWheelScroller: {
  //     focus: false,
  //     speed: 1,
  //   },
  //   space: { left: 10, right: 10, top: 10, bottom: 10, panel: 10, },
  // })
  // .once('sizer.postlayout', function(child, sizer){
  //   scene.log('scrollablePanel postlayout');
  //   child.scrollToBottom();
  // })

  var scrollablePanel = scene.rexUI.add.gridTable({
    height: viewport.height * 0.6,
    scrollMode: 'vertical',
    background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
    table: { columns: 1, mask: { padding: 2,}, reuseCellContainer: true },
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
    space: { left: 10, right: 10, top: 10, bottom: 10, table: 10, },

    items: logData,
    createCellContainerCallback: createCellContainerCallback,
  })
  .once('sizer.postlayout', function(child, sizer){
    scene.log('scrollablePanel postlayout');
    //child.scrollToBottom();
  })

  var createCellContainerCallback = function (cell, cellContainer) {
    var scene = cell.scene,
        index = cell.index,
        width = cell.width,
        item = cell.item,
        // 這裡可以有幾種變化：
        // var msgAlign = item['logSideIdx']==0?'left':'right'; //只要換人講話就切換位置
        // var msgAlign = item['logType']=='host'?'right':'left'; //模仿messenger，只有玩家講話在右側，其餘在左側
        msgAlign = item['logSideIdx']==0?'left':'right';

    if (cellContainer === null) {
        cellContainer = CreateCellContainer(scene, viewport, msgAlign, item)
        console.log(cell.index + ': create new cell-container');
    } else {
        console.log(cell.index + ': reuse cell-container');
    }

    if (item['logIsHeader']){
      cellContainer.getElement('logSizer.namedText.nameLabel').show();
      cellContainer.getElement('logSizer.portrait').show();
    } else {
      cellContainer.getElement('logSizer.namedText.nameLabel').hide();
      cellContainer.getElement('logSizer.portrait').hide();
    }

    // Set content

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
  
    var bgRadius = {
      tl: tl,
      tr: tr,
      bl: bl,
      br: br
    }
    var logColor = Number('0x' + GetValue(item, 'logColor', 0)) //canvas只吃數字style

    cellContainer.getElement('logSizer.namedText.textLabel.background').setRadius(bgRadius).setFillStyle(logColor);
    cellContainer.getElement('logSizer.namedText.textLabel.text').setText(GetValue(item, 'serif', ''))
    cellContainer.getElement('logSizer.namedText.nameLabel.text').setText(GetValue(item, 'displayName', ''))

    // Set bubble shape

    // cellContainer.getElement('bubble').setUpdateShapesCallback(
    //     (item.isLeft) ? LeftTailBubble : RightTailBubble
    // );

    // Layout manually, to get cell height

    // cellContainer
    //     .setDirty(true).layout()  // Run layout manually
    //     .setDirty(false)          // Don't run layout again
    // cell.height = cellContainer.height + 10;

    return cellContainer;
  }

  var CreateCellContainer = function (scene, viewport, msgAlign, logData) {
    return scene.rexUI.add.sizer({
    })
    .add(CreateLogSizer(scene, viewport, msgAlign, logData), {align: msgAlign, key:'cellContainer'})
  }

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
    space: { left:0, right: 0, top: 0, bottom: 0, item: 5, },
    key: 'logSizer'
  });
  var portrait = scene.add.image(0, 0, 'ico_user').setDisplaySize(90, 90)
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

export default CreateGridLogPanel;