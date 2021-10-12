import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';

var CreateTitleLabel = function (scene, text) {
    var OpenHelpDialog = function () {
        console.log('TODO: OpenHelpDialog')
    }

    return scene.rexUI.add.overlapSizer({
        space: { top: 10, bottom: 10 }
    })
        .addBackground(CreateRoundRectangleBackground(scene, 0, 0xD2691E))
        .add(
            scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 }),
            {
                align: 'center', expand: false, key: 'title',
            }
        )
        .add(
            CreateHelpButton(scene, OpenHelpDialog),
            {
                align: 'right', offsetX: -20, expand: false, key: 'help',
            }
        )
}

var CreateHelpButton = function (scene, callback) {
    var buttonLabel = scene.rexUI.add.label({
        background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 3),
        text: scene.rexUI.add.BBCodeText(0, 0, '?', {
            fontFamily: 'DFKai-SB', fontSize: 50,
            fixedWidth: 50, fixedWidth: 50, halign: 'center', valign: 'center'
        }),
        space: { left: 10, right: 10, top: 10, bottom: 10 }
    })

    scene.rexUI.add.click(buttonLabel, {})
        .on('click', callback)
    return buttonLabel;
}

export default CreateTitleLabel;