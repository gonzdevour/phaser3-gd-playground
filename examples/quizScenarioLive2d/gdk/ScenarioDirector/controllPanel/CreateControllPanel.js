import CreateControllButtons from "./CreateControllButtons.js";
import CreateCloseButton from "./CreateCloseButton.js";
import AddEvent from "../../../../../../phaser3-rex-notes/plugins/utils/gameobject/addevent/AddEvent.js";
import Locate from "../../layer/Locate.js";

var CreateControllPanel = function(scene, director, viewport){

    var panel = scene.rexUI.add.overlapSizer({});

    panel.clickArea = scene.rexUI.add.overlapSizer({})
        .onClick(function () {
            director.onClick(); //註冊onClick callback執行director的動作
        });

    panel.buttons = CreateControllButtons(scene, 0.5*viewport.width, 0-0.5*viewport.height-10, 0.5*viewport.width, 0.5*viewport.height)
        .setOrigin(1,1)
    
    panel.btn_close = CreateCloseButton(scene);

    panel
        .add(panel.clickArea)
        .add(panel.buttons)
        .add(panel.btn_close,{
            key: 'close',
            align: 'right-top',
            offsetX: -10,
            offsetY: 10,
            expand: false,
        })

    Locate(scene, panel, {instID: 'scenario control panel', layerName: 'scenario_ui', viewport: viewport, vpx: 0.5, vpy: 0.5});

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

var CreateOptionLabel = function (scene, config) {
    var btn = scene.rexUI.add.label({
      background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),
      // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
      text: scene.rexUI.add.BBCodeText(0, 0, GetValue(config, 'text', ''), { fontFamily: Style.fontFamilyName, fontSize: 24 }),
      space: { left: 10, right: 10, top: 10, bottom: 10, icon: 10 },
  
      name: GetValue(config, 'text', '')   // !! button.name會被用在buttons.value的指定
    }).onClick(GetValue(config, 'fn', undefined), scene) //以scene作為fn裡的this
  
    RegisterBehaviors(btn, ['ninja']);
  
    return btn;
  }

export default CreateControllPanel;