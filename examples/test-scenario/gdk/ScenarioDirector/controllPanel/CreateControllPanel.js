import CreateControllButtons from "./CreateControllButtons.js";

var CreateControllPanel = function(scene, director, viewport){

    var panel = scene.rexUI.add.overlapSizer({});

    panel.clickArea = scene.rexUI.add.overlapSizer({})
        .onClick(function () {
            director.onClick();
        });

    panel.buttons = CreateControllButtons(scene, 0.5*viewport.width, 0-0.5*viewport.height-10, 0.5*viewport.width, 0.5*viewport.height)
        .setOrigin(1,1)
    
    panel
        .add(panel.clickArea)
        .add(panel.buttons)

    scene.layerManager.addToLayer('ui', panel);
    scene.vpc.add(panel, viewport, 0.5, 0.5);

    panel.debugGraphics = scene.add.graphics()

    var UpdatePanel = (function() {
        panel.debugGraphics.clear();
        panel
            .setMinSize(viewport.width, viewport.height)
            .layout()
            .drawBounds(panel.debugGraphics, 0x00ff00)
        panel.clickArea
            .setMinSize(viewport.width,viewport.height)
            .layout()
            .drawBounds(panel.debugGraphics, 0x00ffff)
    });

    scene.scale.on('resize', UpdatePanel);
    UpdatePanel();

    return panel;
}

export default CreateControllPanel;