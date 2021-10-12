var TransitionIn = function (dialog, mainPanel) {
    dialog.popUp(500);
    if (mainPanel) {
        mainPanel.getTopmostSizer().fadeOut(500);
    }
}

var TransitionOut = function (dialog, mainPanel) {
    dialog.scaleDownDestroy(500);
    if (mainPanel) {
        mainPanel.getTopmostSizer().fadeIn(500);
    }
}

export { TransitionIn, TransitionOut }