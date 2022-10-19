import AddUpdateEvent from "../../../../../../phaser3-rex-notes/plugins/utils/gameobject/addevent/AddUpdateEvent";

var CreateScenarioViewport = function(scene, x, y, width, height){
    var viewport = new Phaser.Geom.Rectangle();
    viewport.dbgGraphics = scene.add.graphics();

    var UpdateViewport = (function() {

        viewport.setTo(scene.viewport.left+x, scene.viewport.top+y, width, height);
        // viewport.dbgGraphics
        // .clear()
        // .lineStyle(10, 0xff0000, 0.5)
        // .strokeRectShape(viewport)
    });
    scene.scale.on('resize', UpdateViewport);
    UpdateViewport();

    return viewport;
}

export default CreateScenarioViewport;