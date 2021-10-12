import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import CreateTitleLabel from './CreateTitleLabel.js';

const PanelName = 'mode';
const GetValue = Phaser.Utils.Objects.GetValue;

var CreateQuizModePanel = function (scene, config) {
    var title = CreateTitleLabel(scene, '出題模式');

    var buttons = [
        CreateOptionLabel(scene, '隨機'),
        CreateOptionLabel(scene, '依序'),
        CreateOptionLabel(scene, '測驗'),
    ]
    var choices = scene.rexUI.add.fixWidthButtons({
        align: 'justify',
        // justifyPercentage: 1,
        space: { line: 30, item: 30 },
        type: 'radio',
        buttons: buttons,
        setValueCallback: function (button, value, previousValue) {
            button.getElement('background')
                .setFillStyle((value) ? 0x8B4513 : undefined)
        },
    })
    choices.value = GetValue(config, `radio.${PanelName}`, '隨機');

    return scene.rexUI.add.sizer({
        orientation: 'y',
        name: PanelName
    })
        .add(
            title,
            { proportion: 0, align: 'center', expand: true }
        )
        .add(
            choices,
            {
                proportion: 0, align: 'center', expand: true,
                padding: { left: 80, right: 80, top: 40 },
                key: 'choices'
            }
        )
}

var CreateOptionLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),
        // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
        text: scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 }),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 },

        name: text   // !! Important: This value will be used as option name in choices sizer
    });
}

export default CreateQuizModePanel