var TransitionIn = function (newUI, prevUI) {
    newUI.popUp(500);
    if (prevUI) {
        prevUI.fadeOut(500);
    }
}

var TransitionOut = function (currUI, prevUI) {
    currUI.scaleDownDestroy(500);
    if (prevUI) {
        prevUI.fadeIn(500);
    }
}

export { TransitionIn, TransitionOut }