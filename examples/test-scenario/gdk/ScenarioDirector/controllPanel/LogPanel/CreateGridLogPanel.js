import CreateRoundRectangleBackground from '../../../templates/CreateRoundRectangleBackground.js';
import CreateCellContainerCallback from './createCellContainerCallback.js';

/* 
logData:[{
  logType: 'story'|'host'|'actor'|'choice', //故事|玩家|角色|選擇
  logColor: 0x0, //代表色
  logSideIdx: logSideIdx, //log排列位置編號，例：1靠左，0靠右
  logIsHeader: ifDifferentTalker, //true: 此log為該說話者的第一個log
  logIsFooter: undefined | true //true: 此log為該說話者的最後一個log(注意同一log可能既是header也是footer)
  actorID:actorID, 
  displayName: displayName, 
  expression: expression, 
  serif: serif
}]
*/

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

  var scrollablePanel = scene.rexUI.add.gridTable({
    height: viewport.height * 0.6,
    scrollMode: 'vertical',
    background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
    table: { 
      columns: 1, 
      mask: { padding: 2}, 
      reuseCellContainer: true,
    },
    slider: {
      track: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, 0x260e04),
      thumb: scene.rexUI.add.roundRectangle(0, 0, 10, 90, 10, 0x7b5e57),
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
    createCellContainerCallback: CreateCellContainerCallback,
  })
  .once('sizer.postlayout', function(child, sizer){
    //sizer.drawBounds(scene.add.graphics(), 0xff0000);
    scene.log('scrollablePanel postlayout');
    //child.scrollToBottom();
  })

  mainPanel
    .add(scrollablePanel, {
      proportion: 1, align: 'center', expand: true,
      key: 'scrollablePanel'
    })
    .once('postlayout', function (children, sizer) {
      //mainPanel.setMinSize(mainPanel.width, mainPanel.height);
    })

  return mainPanel;
}

export default CreateGridLogPanel;