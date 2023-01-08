var CreateBackground = function (scene, backgroundID, key, frame, vpx, vpy) {
    vpx = vpx?vpx:0.5;
    vpy = vpy?vpy:0.5;
    var director = scene.scenario.director
    var viewport = scene.scenario.director.viewport;
    var background = scene.add.rexTransitionImage(0, 0, key, frame, {}) //.setAlpha(0.2)

    if (director.backgroundAutoScale){
        var bgWidth = (viewport.height/background.height)*background.width;
        background.setDisplaySize(bgWidth, viewport.height)
    }

    scene.layerManager.addToLayer('scenario_stage', background);
    scene.vpc.add(background, viewport, vpx, vpy);

    return background;
}

export default CreateBackground;