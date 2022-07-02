import GetValue from "../../plugins/utils/object/GetValue";
import CreateDropDownList from "./CreateDropDownList";

const COLOR_PRIMARY = 0x474747; //#474747
const COLOR_LIGHT = 0x8f8f8f; //#8f8f8f
const COLOR_DARK = 0x222222; //#222222

var CreateMainPanel = function(scene, config){
    var character = GetValue(config, 'character', undefined);

    var ctrlDisplay = scene.rexUI.add.sizer({
        orientation: 'x',
        // rtl: false,
    
        // x: 0,
        // y: 0,
        // anchor: undefined,
        // width: undefined,
        // height: undefined,
        space: { left: 0, right:0, top:0, bottom:0, item:20 },
    
        // name: '',
        // draggable: false,
        // sizerEvents: false,
    })
    .add(
        CreateLive2DExpressionSelector(scene, character),
        {
            proportion: 0,
            padding: {left: 0, right: 0, top: 0, bottom: 0},
            key: 'Live2DExpressionSelector',
        }
    )
    .add(
        CreateLive2DMotionSelector(scene, character),
        {
            proportion: 0,
            padding: {left: 0, right: 0, top: 0, bottom: 0},
            key: 'Live2DMotionSelector',
        }
    )
    //.layout()

    var ctrlMain = scene.rexUI.add.overlapSizer(scene.viewport.x, scene.viewport.y, scene.viewport.width, scene.viewport.height, {
        // anchor: undefined,
        // space: { left: 0, right:0, top:0, bottom:0 },
        // name: '',
        // draggable: false,
        // sizerEvents: false,
    })
    .add(ctrlDisplay,
        {
            key: 'ctrlDisplay',
            align: 'left-bottom',
            expand: false,
            offsetX: 0,
            offsetY: 0,
            padding: {left: 0, right: 20, top: 0, bottom: 20},    
        }
    );

    ctrlMain    
        .setPosition(scene.viewport.centerX, scene.viewport.centerY)
        .setMinSize(scene.viewport.width-50, scene.viewport.height-50)
        .layout()
        //.drawBounds(scene.add.graphics(), 0xff0000)

    CreatePanelResizer(scene, ctrlMain);

    return ctrlMain;
}

var CreatePanelResizer = function(scene, mainPanel){
      //viewport resize
      var graphics = scene.add.graphics();
      scene.scale.on('resize', function () {
          var innerViewport = scene.rexScaleOuter.innerViewport;
          scene.viewport = scene.rexScaleOuter.outerViewport;
          graphics
              .clear()
              .lineStyle(10, 0x00ff00)
              .strokeRectShape(innerViewport)
              .lineStyle(30, 0xff0000)
              .strokeRectShape(scene.viewport)
          mainPanel    
            .setMinSize(scene.viewport.width-50, scene.viewport.height-50)
            .layout()
      }, scene);
}

var CreateLive2DMotionSelector = function(scene, character){
    var config = {
        character: character,
        x: 100, y:36,
        title: '-- motion --',
        options: character.getMotionNames(),
        onButtonClickCallback: function (button, index, pointer, event) {
            var arr = button.value.split('_');
            var groupName = arr[0];
            var motionNum = arr[1];
            character.startMotion(groupName, motionNum, 'force');
        },
    };
    return CreateDropDownList(scene, config)
}

var CreateLive2DExpressionSelector = function(scene, character){
    var config = {
        character: character,
        x: 350, y:36,
        title: '-- expression --',
        options: character.getExpressionNames(),
        onButtonClickCallback: function (button, index, pointer, event) {
            character.setExpression(button.value);
        },
    };
    return CreateDropDownList(scene, config)
}

export default CreateMainPanel;