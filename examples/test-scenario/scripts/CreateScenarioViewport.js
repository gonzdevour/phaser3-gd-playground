import AddUpdateEvent from "../../../../phaser3-rex-notes/plugins/utils/gameobject/addevent/AddUpdateEvent";

var CreateScenarioViewport = function(scenarioDirector){
    var scene = scenarioDirector.scene;
    var viewport = new Phaser.Geom.Rectangle();
    var UpdateViewport = (function() {
        viewport.setTo(scene.viewport.left+10, scene.viewport.top+10, scene.viewport.width - 20, scene.viewport.height - 20);
    });
    scene.scale.on('resize', UpdateViewport);
    UpdateViewport();

    var sprite0 = scene.add.rectangle(0, 0, 30, 30).setStrokeStyle(2, 0xffff00);
    scene.plugins.get('rexViewportCoordinate').add(sprite0, viewport);
    sprite0.vpx = 0.3;

    var tween = scene.tweens.add({
        targets: sprite0,
        vpx: 0.7,
        ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 2000,
        repeat: -1,            // -1: infinity
        yoyo: true
    });

    var sprite1 = scene.add.rectangle(0, 0, 30, 30).setStrokeStyle(2, 0x00ff00);
    scene.plugins.get('rexViewportCoordinate').add(sprite1, viewport);
    sprite1.vpx = 0.7;


    scenarioDirector.viewport = viewport;
    scenarioDirector.dbgGraphics = scene.add.graphics();

    AddUpdateEvent(scenarioDirector.dbgGraphics, function(time, delta){
        scenarioDirector.dbgGraphics
            .clear()
            .lineStyle(4, 0xff0000, 0.5)
            .strokeRectShape(scenarioDirector.viewport)
    });

    return viewport;
}

export default CreateScenarioViewport;