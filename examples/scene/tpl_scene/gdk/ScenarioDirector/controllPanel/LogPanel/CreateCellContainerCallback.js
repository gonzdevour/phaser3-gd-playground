import CreateCellContainer from './CreateCellContainer.js';
import composeActorLog from './LogTypes/composeActorLog.js';
import composeChoiceLog from './LogTypes/composeChoiceLog.js';
import composeHostLog from './LogTypes/composeHostLog.js';
import composeStoryLog from './LogTypes/composeStoryLog.js';

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
  var scene = cell.scene, item = cell.item, width = cell.width, index = cell.index, 
      viewport = scene.scenario.director.viewport,
      // 這裡可以有幾種變化：
      // var msgAlign = item['logSideIdx']==0?'left':'right'; //只要換人講話就切換位置
      // var msgAlign = item['logType']=='host'?'right':'left'; //模仿messenger，只有玩家講話在右側，其餘在左側
      msgAlign = item['logSideIdx']==0?'left':'right'; //只要換人講話就切換位置

  if (cellContainer === null) {
      cellContainer = CreateCellContainer(scene, viewport, msgAlign, item).setOrigin(0);
      //console.log(cell.index + ': create new cell-container');
  }
  if (item['logType'] == 'story'){
    msgAlign = 'center';
    composeStoryLog(cell, cellContainer);
  }
  if (item['logType'] == 'choice'){
    composeChoiceLog(cell, cellContainer);
  }
  if (item['logType'] == 'host'){
    composeHostLog(cell, cellContainer);
  }
  if (item['logType'] == 'actor'){
    composeActorLog(cell, cellContainer);
  }
  cellContainer
      .setDirty(true).layout()  // Run layout manually
      .setDirty(false)          // Don't run layout again
  cell.height = cellContainer.height + 10;
  cell.setCellContainerAlign(msgAlign);

  return cellContainer;
}

export default CreateCellContainerCallback;