var CreateActionButtons = function (scene, hasOKButton, hasCancelButton) {
    // Build UI
    var oneButtonMode = hasOKButton && !hasCancelButton;
    var buttons = scene.rexUI.add.sizer({
        orientation: 'x'
    })

    if (oneButtonMode) {
        buttons
            .addSpace()
            .add(
                CreateLabel(scene, 'yes'),
                { key: 'yes' }
            )
            .addSpace()
    } else {
        buttons
            .add(
                CreateLabel(scene, 'yes'),
                { key: 'yes' }
            )
            .addSpace()
            .add(
                CreateLabel(scene, 'no'),
                { key: 'no' }
            )
    }

    return buttons;
}

var CreateLabel = function (scene, img) {
    return scene.rexUI.add.label({
        // background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),
        icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
        // text: scene.rexUI.add.BBCodeText(0, 0, 'X', { fontFamily: 'DFKai-SB', fontSize: 60 }),
        // space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 },
    })
}

export default CreateActionButtons;