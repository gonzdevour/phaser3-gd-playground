var TransitionIn = function (newUI, prevUI, duration) {
    if (duration === undefined) {
        duration = 500;
    }
    newUI.popUp(duration);
    if (prevUI) {
        var scene = prevUI.scene;
        var cover = scene.rexUI.add.cover({ alpha: 0 });
        scene.rexUI.fadeIn(cover, duration, 0.9);

        newUI.moveDepthBelow(cover);
        prevUI.cover = cover;
    }
}

var TransitionOut = function (currUI, prevUI, duration) {
    if (duration === undefined) {
        duration = 500;
    }
    currUI.scaleDownDestroy(duration);
    if (prevUI && prevUI.cover) {
        var scene = prevUI.scene;
        scene.rexUI.fadeOutDestroy(prevUI.cover, duration);
        prevUI.cover = undefined;
    }
}

export { TransitionIn, TransitionOut }