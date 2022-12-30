import GetValue from "../../../../../../../plugins/utils/object/GetValue";
import getBackgroundgRadius from "../LogStyle/getBackgroundgRadius";
import GetTextureKey from "../LogStyle/GetTextureKey";
import LeftTailBubble from "./LeftTailBubble";
import RightTailBubble from "./RightTailBubble";

var composeHostLog = function(cell, cellContainer){
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

  cellContainer.show(portrait);
  if (item['logIsHeader']){
    cellContainer.show(nameLabel);
    cellContainer.setChildVisible(portrait, true);
  } else {
    cellContainer.hide(nameLabel);
    cellContainer.setChildVisible(portrait, false);
  }

  logSizer.space = { left:0, right: 0, top: 0, bottom: 0, item: 5, };
  portrait.setTexture(GetTextureKey(scene, item.actorID, item.expression)).setDisplaySize(90, 90);
  textLabel.setMinWidth(0);
  contentText.setWrapWidth(viewport.width*0.5).setText(GetValue(item, 'serif', ''))
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

  return cellContainer;
}

export default composeHostLog;