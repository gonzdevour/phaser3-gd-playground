var CreateScenarioViewport = function(scene, x, y, maxWidth, maxHeight){
    var viewport = new Phaser.Geom.Rectangle();
    viewport.dbgGraphics = scene.add.graphics();

    if (maxWidth != undefined){
        viewport.scenarioMaxWidth = maxWidth;
    }

    if (maxHeight != undefined){
        viewport.scenarioMaxHeight = maxHeight;
    }

    var UpdateViewport = (function() {

        var vw,vh;
        if (viewport.scenarioMaxWidth != undefined && viewport.scenarioMaxWidth<scene.viewport.width){ //有寬度限制且目前viewport大於此寬度
            vw = viewport.scenarioMaxWidth;
        } else {
            vw = scene.viewport.width;
        }

        if (viewport.scenarioMaxHeight != undefined && viewport.scenarioMaxHeight<scene.viewport.height){ //有寬度限制且目前viewport大於此寬度
            vh = viewport.scenarioMaxHeight;
        } else {
            vh = scene.viewport.height;
        }
        var vx = scene.viewport.centerX-0.5*vw;
        var vy = scene.viewport.centerY-0.5*vh;

        // var vw = scene.viewport.width;
        // var vh = scene.viewport.height;
        // var vx = scene.viewport.left;
        // var vy = scene.viewport.top;

        if (viewport){
            viewport.setTo(vx, vy, vw, vh);
            // viewport.dbgGraphics
            // .clear()
            // .lineStyle(10, 0xff0000, 0.5)
            // .strokeRectShape(viewport)
        }

    });
    scene.scale.on('resize', UpdateViewport);
    UpdateViewport();

    return viewport;
}

export default CreateScenarioViewport;