import CreateRoundRectangleBackground from '../CreateRoundRectangleBackground.js';
import CreateCellContainerCallback from './CreateCellContainerCallback.js';

import { DialogY } from '../../modaldialog/DialogType.js';

var CreateGridLoadPanel = function (scene, itemsCnt) {
  var lsData = scene.game.lsData;
  //var director = scene.scenario.director;
  var viewport = scene.viewport;

  var items = [];
  for (let index = 0; index < itemsCnt; index++) {
    var item = lsData.get('scenario_save_slot' + index)
    items.push(item);
  }

  var mainPanel = scene.rexUI.add.sizer({
    orientation: 'x',
    space: { item: 30 },
    sizerEvents: true,
  })
  .on('postlayout', function(){
    scene.log('mainPanel postlayout')
  })
  .setMinSize(viewport.width-50, viewport.height*0.55)

  var gridTable = scene.rexUI.add.gridTable({
    scrollMode: 'vertical',
    background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
    table: {
        columns: 1,
        mask: {
            padding: 2,
        },
        reuseCellContainer: true,
    },
    items: items,
    //scroller
    slider: {
      track: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, 0x202020), //#202020
      thumb: scene.rexUI.add.roundRectangle(0, 0, 10, 90, 10, 0xdfdfdf), //#dfdfdf
    },
    scroller: {
      threshold: 5,
      slidingDeceleration: 5000,
      backDeceleration: 5000,
      pointerOutRelease: false,
    },
    // mouseWheelScroller: {
    //   focus: false,
    //   speed: 1,
    // },
    space: { left: 20, right: 20, top: 20, bottom: 20, table: 20, },
    createCellContainerCallback: CreateCellContainerCallback,
  })
  .once('sizer.postlayout', function(child, sizer){
    //child.scrollToBottom();
  })
  .layout()
  //.drawBounds(scene.add.graphics(), 0xff0000)
  .on('cell.over', function(cellContainer, cellIndex, pointer){
    //cellContainer.getElement('saveSlot.background').setStrokeStyle(0xeeeeff, 3);
  })
  .on('cell.out', function(cellContainer, cellIndex, pointer){
    //cellContainer.getElement('saveSlot.background').setStrokeStyle();
  })
  .on('cell.click', function(cellContainer, cellIndex, pointer){
    // console.log('cell.click' + cellIndex)
    // console.log(items[cellIndex])

    var loadCallback = function(){
      //director.load(cellIndex);
      var modalDialog = mainPanel.getTopmostSizer(); //取得最上層含modal的dialog(GridLoadPanel)
      scene.rexUI.modalClose(modalDialog);
      modalDialog.once('modal_close', function(){
        scene.toast.bake('load complete！')
      })
    }

    if (items[cellIndex]){ //該欄位有檔案存在，詢問是否讀取檔案
      DialogY(scene, {
        //title: '複習列表',
        content: `檔案${String(cellIndex+1).padStart(2, '0')}，要從這個進度開始嗎？`,
        actions: [
          {imageKey:'ico_yes', text: '確定', type: 'confirm', callback: loadCallback, closeDialog:true},
          {imageKey:'ico_no', text: '取消', type: 'cancel', callback: undefined, closeDialog:true},
        ],
        buttonMode: 1, //是否手動manualClose
        extraConfig: { //客製調整參數
          background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0),
          viewport: viewport,
          width: viewport.width-100,
          duration:{ in: 100, out: 0 },
          space: { top: 40 },
        },
      })
    } else {
      console.log('no file could be loaded') //該欄位沒有檔案存在，點擊沒有反應
    }
  })

  mainPanel
  .add(gridTable, {
    proportion: 1, align: 'center', expand: true,
    key: 'gridTable'
  })
  .once('postlayout', function (children, sizer) {
    //mainPanel.setMinSize(mainPanel.width, mainPanel.height);
  })

  return mainPanel;
}

export default CreateGridLoadPanel;