import CreateRoundRectangleBackground from '../../../templates/CreateRoundRectangleBackground.js';
import CreateCellContainerCallback from './CreateCellContainerCallback.js';

var CreateTestLogPanel = function (scene, logData) {

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

    scrollMode: 'vertical',
    background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
    table: {
        columns: 1,
        mask: {
            padding: 2,
        },
        reuseCellContainer: true,
    },
    items: logData,

    //scroller

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

    space: { left: 20, right: 20, top: 20, bottom: 20, table: 10, },
    createCellContainerCallback: CreateCellContainerCallback,
  })
  .layout()
  //.drawBounds(scene.add.graphics(), 0xff0000);

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

export default CreateTestLogPanel;