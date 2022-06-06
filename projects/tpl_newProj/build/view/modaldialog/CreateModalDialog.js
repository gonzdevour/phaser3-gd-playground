import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';

//utils
import GetValue from '../../../../../plugins/utils/object/GetValue.js';

/*
呼叫QuizResultModalPromise後，取得: 
    return ModalDialogPromise(scene, {
        //答錯顯示正確答案 | 答對顯示打勾圖片
        content: characterUI, | scene.add.image(0, 0, 'yes').setDisplaySize(540, 540),
    })
因此config = { content: characterUI } //characterUI是帶字與注音的CharacterSizer

CreateModalDialog被ModalDialogPromise呼叫，建立dialog：
https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ui-dialog/?h=dialog#add-dialog-object
*/
var CreateModalDialog = function (scene, config) {
    //這邊開始處理dialog要用到的config
    if (config === undefined) {
        config = {};
    }
    config.buttonMode = GetValue(config, 'buttonMode', 0)//按鈕模式，聯動控制modalPromise的manualClose設定是否手動關閉
    switch (config.buttonMode) {
        case 5: // 自訂actions，可能可以給buttons
            config.choicesBackground = CreateRoundRectangleBackground(scene, 20, 0x110606, 0x663030, 6); //'#663030''#110606'
            config.choices = CreateButtons(scene, config.buttonsData);
            config.actions = [
                scene.rexUI.add.space(),
                CreateButton(scene, 'yes'),
                scene.rexUI.add.space()
            ];
            break;
        default:
            break;
    }

    var dialog = scene.rexUI.add.dialog(config);

    //將modal底板移到dialog的下層
    if (config.background) {
        dialog.moveDepthBelow(config.background);
    }

    return dialog;
}

export default CreateModalDialog;