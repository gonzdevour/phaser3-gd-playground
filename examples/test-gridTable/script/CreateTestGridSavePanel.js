import CreateRoundRectangleBackground from './templates/CreateRoundRectangleBackground.js';
import CreateCellContainerCallback from './CreateCellContainerCallback.js';

import ModalGridTablePromise from './ModalGridTablePromise.js';
import CreateGridTable from './CreateGridTable.js';

var CreateTestGridSavePanel = function (scene) {
  var viewport = scene.viewport;
  var items = [];
  for (let index = 0; index < 30; index++) {
    var item = undefined;
    items.push(item);
  }

  var gridTable = CreateGridTable(scene, {
    x: viewport.centerX,
    y: viewport.centerY,
    width: viewport.width-50, 
    height: viewport.height*0.7,
    scrollMode: 'vertical',
    background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
    table: {
        columns: 1,
        mask: {
            padding: 2,
        },
        interactive: true,
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
    mouseWheelScroller: {
      focus: false,
      speed: 1,
    },
    space: { left: 20, right: 20, top: 20, bottom: 20, table: 10, },
    createCellContainerCallback: CreateCellContainerCallback,
  })

  return gridTable;
}

export default CreateTestGridSavePanel;