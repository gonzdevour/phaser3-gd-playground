var TransitionIn = function (newUI, prevUI, duration) {
    if (duration === undefined) {
        duration = 500;
    }
    newUI.popUp(duration);
    if (prevUI) {
        prevUI.fadeOut(duration);
    }
}

var TransitionOut = function (currUI, prevUI, duration) {
    if (duration === undefined) {
        duration = 500;
    }
    currUI.scaleDownDestroy(duration);
    if (prevUI) {
        prevUI.fadeIn(duration);
    }
}

export { TransitionIn, TransitionOut }