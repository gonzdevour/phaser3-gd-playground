import CreateControllButtons from "./CreateControllButtons.js";
import AddEvent from "../../../../../../phaser3-rex-notes/plugins/utils/gameobject/addevent/AddEvent.js";

var CreateControllPanel = function(scene, director, viewport){

    var panel = scene.rexUI.add.overlapSizer({});

    panel.clickArea = scene.rexUI.add.overlapSizer({})
        .onClick(function () {
            director.onClick(); //註冊onClick callback執行director的動作
        });

    panel.buttons = CreateControllButtons(scene, 0.5*viewport.width, 0-0.5*viewport.height-10, 0.5*viewport.width, 0.5*viewport.height)
        .setOrigin(1,1)
    
    panel
        .add(panel.clickArea)
        .add(panel.buttons)

    scene.layerManager.addToLayer('scenario_ui', panel);
    scene.vpc.add(panel, viewport, 0.5, 0.5);

    panel.debugGraphics = scene.add.graphics()

    var UpdatePanel = (function() {
        panel.debugGraphics.clear();
        panel
            .setMinSize(viewport.width, viewport.height) //clickArea的expand預設為true，所以會跟著panel的大小，不用另外設定
            .layout()
            //.drawBounds(panel.debugGraphics, 0x00ff00)
    });
    UpdatePanel();

    var scale = scene.scale;
    AddEvent(panel, scale, 'resize', function(pointer, localX, localY, event){
        UpdatePanel();
    });

    return panel;
}

export default CreateControllPanel;