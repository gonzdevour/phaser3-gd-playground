import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import CreateTitleLabel from './CreateTitleLabel.js';
import ModalDialogPromise from '../modeldialog/ModalDialogPromise.js';
import { DataBaseOptions } from './Options.js'

const PanelName = 'database';
const GetValue = Phaser.Utils.Objects.GetValue;

var CreateDatabaseSelectPanel = function (scene, config) {
    // Build UI
    var title = CreateTitleLabel(scene, '詞庫選擇');

    var buttons = [];
    for (var i = 0, cnt = DataBaseOptions.length; i < cnt; i++) {
        var option = DataBaseOptions[i];
        buttons.push(
            CreateOptionLabel(scene, option.description, option.title)
        )
    }
    var choices = scene.rexUI.add.buttons({
        orientation: 'y',
        type: 'radio',
        expand: true,
        space: { item: 20 },
        buttons: buttons,
        setValueCallback: function (button, value, previousValue) {
            button.getElement('button.background')
                .setFillStyle((value) ? 0x8B4513 : undefined)
        },
    })
    choices.value = GetValue(config, `radio.${PanelName}`, '高頻詞庫');

    var panel = scene.rexUI.add.sizer({
        orientation: 'y',
        name: PanelName
    })
        .add(
            title,
            { proportion: 0, align: 'center', expand: true, }
        )
        .add(
            choices,
            {
                proportion: 0, align: 'center', expand: true,
                padding: { left: 80, right: 80, top: 40 },
                key: 'choices'
            }
        )

    // Add button callback
    title.getElement('help').onClick(function () {
        ModalDialogPromise(scene, {
            title: '詞庫選擇',
            content: 'Content',
            buttonMode: 1,

            width: 500,
        })
    })

    return panel

}

var CreateOptionLabel = function (scene, title, text) {
    return scene.rexUI.add.sizer({
        orientation: 'y',
        space: { item: 10 },

        name: text   // !! Important: This value will be used as option name in choices sizer
    })
        .add(
            scene.rexUI.add.BBCodeText(0, 0, title, { fontFamily: 'DFKai-SB', fontSize: 50 }),
            { align: 'center', key: 'title' }
        )
        .add(
            scene.rexUI.add.label({
                orientation: 'y',
                background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),
                // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
                text: scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 }),
                // action: scene.add.image(0, 0, img).setDisplaySize(90, 90),
                space: { top: 20, bottom: 10, text: 30 }
            }),
            { expand: true, key: 'button' }
        )
}

export default CreateDatabaseSelectPanel;