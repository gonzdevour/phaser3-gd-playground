import GetValue from "../../../../../../../plugins/utils/object/GetValue";
import getBackgroundgRadius from "../LogStyle/getBackgroundgRadius";
import GetTextureKey from "../LogStyle/GetTextureKey";
import StoryBubble from "./StoryBubble";

var composeStoryLog = function(cell, cellContainer){
  var scene = cell.scene, 
      width = cell.width, 
      item = cell.item,
      index = cell.index, 
      viewport = scene.scenario.director.viewport,
      // 這裡可以有幾種變化：
      // var msgAlign = item['logSideIdx']==0?'left':'right'; //只要換人講話就切換位置
      // var msgAlign = item['logType']=='host'?'right':'left'; //模仿messenger，只有玩家講話在右側，其餘在左側
      msgAlign = item['logSideIdx']==0?'left':'right'; //只要換人講話就切換位置
  
  var logSizer = cellContainer.getElement('logSizer');
  var nameLabel = cellContainer.getElement('logSizer.namedText.nameLabel');
  var portrait = cellContainer.getElement('logSizer.portrait');
  var background = cellContainer.getElement('logSizer.namedText.textLabel.background');
  var textLabel = cellContainer.getElement('logSizer.namedText.textLabel');
  var contentText = cellContainer.getElement('logSizer.namedText.textLabel.text');
  var titleText = cellContainer.getElement('logSizer.namedText.nameLabel.text');

  cellContainer.hide(nameLabel);
  cellContainer.hide(portrait);

  logSizer.space = { left:0, right: 0, top: 50, bottom: 50, item: 5, };
  textLabel.setMinWidth(viewport.width*0.75);
  contentText.setWrapWidth(viewport.width*0.75).setText(GetValue(item, 'serif', '')); //text放寬、置中
  titleText.setText(GetValue(item, 'displayName', ''))

  var bgRadius = getBackgroundgRadius(item);
  var logColor = Number('0x' + GetValue(item, 'logColor', 0)); //canvas只吃數字style

  background
    .setData('bgRadius', bgRadius)
    .setData('fillColor', logColor)
    .setData('strokeColor', 0xffffff)
    .setData('lineWidth', 2)
    .setData('item', item)  //可以用DataManager傳入參數，待callback時再從customShape取出使用
  background.setUpdateShapesCallback(StoryBubble);
  logSizer.setRTL(msgAlign=='right'?true:false);
  //cellContainer.setChildAlign(nameLabel, msgAlign);
  //nameLabel.rexSizer.align = msgAlign=='right'?2:0; //0左1中2右

  return cellContainer;
}

export default composeStoryLog;