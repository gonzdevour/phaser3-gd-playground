import CreateTitleLabel from './CreateTitleLabel.js';

var CreateDatabaseSelectPanel = function (scene) {
    var title = CreateTitleLabel(scene, '詞庫選擇');

    var buttons = [
        CreateOptionLabel(scene, '參照教育部公布之詞頻總表', '高頻詞庫'),
        CreateOptionLabel(scene, '分類整理生活中的常見用詞', '常用詞庫'),
    ]
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
    choices.value = '高頻詞庫';

    return scene.rexUI.add.sizer({
        orientation: 'y',
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
}

var CreateOptionLabel = function (scene, title, text) {
    return scene.rexUI.add.sizer({
        orientation: 'y',
        space: { item: 10 },

        name: text
    })
        .add(
            scene.rexUI.add.BBCodeText(0, 0, title, { fontFamily: 'DFKai-SB', fontSize: 50 }),
            { align: 'center', key: 'title' }
        )
        .add(
            scene.rexUI.add.label({
                orientation: 'y',
                background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 20).setStrokeStyle(2, 0xffffff),
                // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
                text: scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 }),
                // action: scene.add.image(0, 0, img).setDisplaySize(90, 90),
                space: { top: 20, bottom: 10, text: 30 }
            }),
            { expand: true, key: 'button' }
        )
}

export default CreateDatabaseSelectPanel;