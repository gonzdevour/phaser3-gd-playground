import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';

var CreateTitleLabel = function (scene, text) { //title, help按鈕
    return scene.rexUI.add.overlapSizer({ //物件可重疊的sizer(使用aligh,padding,offset)
        space: { top: 10, bottom: 10 } //只設定天地，裡面的大小會由元件決定(這裡是由bbcodeText和button label大小決定)
    })
        .addBackground(CreateRoundRectangleBackground(scene, 0, 0xD2691E))
        .add(
            scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 }),
            {
                align: 'center', expand: false, key: 'title',
            }
        )
        //help按鈕會在各面板建立時用getElement('help').onClick來褂上ModalDialogPromise
        .add(
            CreateHelpButton(scene),
            {
                align: 'right', offsetX: -20, expand: false, key: 'help', //帶key才抓得到是按了哪個鈕
            }
        )
}

var CreateHelpButton = function (scene) {
    return scene.rexUI.add.label({ //text font size加上space決定了label的大小
        background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 3),
        text: scene.rexUI.add.BBCodeText(0, 0, '?', {
            fontFamily: 'DFKai-SB', fontSize: 50,
            fixedWidth: 50, fixedWidth: 50, halign: 'center', valign: 'center'
        }),
        space: { left: 10, right: 10, top: 10, bottom: 10 }
    })
}

export default CreateTitleLabel;