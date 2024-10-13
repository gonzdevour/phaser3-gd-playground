import CreateRoundRectangleBackground from '../../../templates/CreateRoundRectangleBackground.js';
import Style from '../../../../settings/Style.js';
import GetValue from 'gdkPlugins/utils/object/GetValue.js';

/* 
var saveState = {
  label: curLabel,
  decisionRecord: this.decisionRecord.stringify(),
  coin: this.coin,
  extraData: extraData?extraData:undefined,
  savingDate: Date.toLocaleString(),
}
*/

var CreateCellContainerCallback = function (cell, cellContainer) {
  var scene = cell.scene, 
      item = cell.item,
      index = cell.index,
      table = cell.table,
      director = scene.scenario.director,
      viewport = scene.scenario.director.viewport

  if (cellContainer === null) {
      cellContainer = CreateCellContainer(scene, viewport, index, item).setOrigin(0);
  }

  var saveSlot = cellContainer.getElement('saveSlot');
  var indexLabel = cellContainer.getElement('saveSlot.indexLabel');
  var contentSizer = cellContainer.getElement('saveSlot.contentSizer');
  var scenarioLabel = cellContainer.getElement('saveSlot.contentSizer.scenarioLabel');
  var dateLabel = cellContainer.getElement('saveSlot.contentSizer.dateLabel');

  indexLabel.setText(String(index+1).padStart(2, '0'))
  scenarioLabel.setText(GetValue(item, 'label', ''))
  dateLabel.setText(GetValue(item, 'savingDate', ''))

  saveSlot.setMinSize(viewport.width*0.85, 100); //以元件決定整體按鈕寬度
  contentSizer.setMinWidth(viewport.width*0.75)

  cellContainer
  .setDirty(true).layout()  // Run layout manually
  .setDirty(false)          // Don't run layout again

  cell.height = cellContainer.height + 10;

  return cellContainer;
}

var CreateCellContainer = function (scene, viewport, index, item) {
  return scene.rexUI.add.sizer({
  })
  .add(CreateSaveSlot(scene, viewport, index, item), {key:'saveSlot'})
}

var CreateSaveSlot = function (scene, viewport, index, item) {
  var sizer = scene.rexUI.add.sizer({
    orientation: 'x',
    space: { left:0, right: 0, top: 0, bottom: 0 },
  })
  sizer.addBackground(CreateRoundRectangleBackground(scene, 10, 0x222222, 0xffffff, 2), undefined, 'background')
  sizer.add(CreateIndexLabel(scene, viewport, index, item), {key:'indexLabel', align: 'top'})
  sizer.add(scene.rexUI.add.roundRectangle(0,0,3,90,3,0x555555),{key: 'separator'})
  sizer.add(CreateContentSizer(scene, viewport, index, item), {key:'contentSizer', align: 'left'})

  return sizer;
}

var CreateIndexLabel = function (scene, viewport, index, item) {
  return scene.rexUI.add.label({
    // background: CreateSpeechBubbleShape(scene, bgRadius, logColor, 0xffffff, 2, logData),
    // background: CreateRoundRectangleBackground(scene, bgRadius, logColor, 0xffffff, 2),
    // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
    text: scene.rexUI.add.BBCodeText(0, 0, String(index+1).padStart(2, '0'), { 
      fontFamily: Style.fontFamilyName, 
      fontSize: 36,
      testString: '|MÉqgy回',
      color: '#bdbdbd',
      padding: 10,
    }),
    align: 'left',
    //space: { left:20, right: 20, top: 10, bottom: 10 } //text在label中的天地
  });
}

var CreateContentSizer = function (scene, viewport, index, item) {
  var sizer = scene.rexUI.add.sizer({
    orientation: 'y',
    space: { left:0, right: 0, top: 0, bottom: 0 },
  })
  //sizer.addBackground(CreateRoundRectangleBackground(scene, 10, 0x222222, 0xffffff, 2))
  sizer.add(CreateScenarioLabel(scene, viewport, index, item), {key:'scenarioLabel', align: 'left'})
  sizer.add(CreateDateLabel(scene, viewport, index, item), {key:'dateLabel', align: 'right'})

  return sizer;
}

var CreateScenarioLabel = function (scene, viewport, index, item) {
  return scene.rexUI.add.label({
    //background: CreateSpeechBubbleShape(scene, bgRadius, logColor, 0xffffff, 2, logData),
    // background: CreateRoundRectangleBackground(scene, bgRadius, logColor, 0xffffff, 2),
    // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
    text: scene.rexUI.add.BBCodeText(0, 0, GetValue(item, 'label', 'EMPTY'), { 
      fontFamily: Style.fontFamilyName, 
      fontSize: 36,
      testString: '|MÉqgy回',
      padding: 10,
    }),
    align: 'center',
    //space: { left:20, right: 20, top: 10, bottom: 10 } //text在label中的天地
  });
}

var CreateDateLabel = function (scene, viewport, index, item) {
  return scene.rexUI.add.label({
    //background: CreateSpeechBubbleShape(scene, bgRadius, logColor, 0xffffff, 2, logData),
    // background: CreateRoundRectangleBackground(scene, bgRadius, logColor, 0xffffff, 2),
    // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
    text: scene.rexUI.add.BBCodeText(0, 0, GetValue(item, 'savingDate', ''), { 
      fontFamily: Style.fontFamilyName, 
      fontSize: 24,
      testString: '|MÉqgy回',
      padding: 10,
    }),
    align: 'center',
    //space: { left:20, right: 20, top: 10, bottom: 10 } //text在label中的天地
  });
}

export default CreateCellContainerCallback;