var CreateScenarioViewport = function(scene, x, y, width, height){
    var viewport = new Phaser.Geom.Rectangle();
    viewport.dbgGraphics = scene.add.graphics();

    var UpdateViewport = (function() {

        var vx = scene.viewport.left;
        var vy = scene.viewport.top;
        var vw = scene.viewport.width;
        var vh = scene.viewport.height;

        viewport.setTo(vx, vy, vw, vh);
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