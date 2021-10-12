var TransitionIn = function (newUI, prevUI) {
    newUI.popUp(500);
    if (prevUI) {
        prevUI.getTopmostSizer().fadeOut(500);
    }
}

var TransitionOut = function (newUI, prevUI) {
    newUI.scaleDownDestroy(500);
    if (prevUI) {
        prevUI.getTopmostSizer().fadeIn(500, 1);
    }
}

export { TransitionIn, TransitionOut }