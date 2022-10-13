import AddUpdateEvent from "../../../../../../phaser3-rex-notes/plugins/utils/gameobject/addevent/AddUpdateEvent";

var CreateScenarioViewport = function(scene, x, y, width, height){
    var viewport = new Phaser.Geom.Rectangle();
    var UpdateViewport = (function() {
        //viewport.setTo(scene.viewport.left+10, scene.viewport.top+10, scene.viewport.width - 20, scene.viewport.height - 20);
        viewport.setTo(scene.viewport.left+x, scene.viewport.top+y, width, height);
    });
    scene.scale.on('resize', UpdateViewport);
    UpdateViewport();

    var dbgGraphics = scene.add.graphics();

    AddUpdateEvent(dbgGraphics, function(time, delta){
        dbgGraphics
            .clear()
            .lineStyle(10, 0xff0000, 0.5)
            .strokeRectShape(viewport)
    });

    return viewport;
}

export default CreateScenarioViewport;