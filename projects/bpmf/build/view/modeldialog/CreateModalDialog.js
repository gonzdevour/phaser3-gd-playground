import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';

//utils
import SetValue from '../../../../../plugins/utils/object/SetValue.js';
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

    //取得camera中央位置與寬高(而非game.config的預設數值)，將成為dialog的位置
    var viewport = scene.rexScaleOuter.outerViewport;
    config.x = GetValue(config, 'x', viewport.centerX);
    config.y = GetValue(config, 'y', viewport.centerY);
    config.width = GetValue(config, 'width', 0); //寬高會由dialog排版自動決定，故預設值為0即可
    config.height = GetValue(config, 'height', 0); //寬高會由dialog排版自動決定，故預設值為0即可

    if (config.background === undefined) {
        //dialog需要底板，如果config中沒有指定background就建一個底板出來
        config.background = CreateRoundRectangleBackground(scene, 20, 0x0, 0xffffff, 2);
    }

    if (typeof (config.title) === 'string') {
        //如果有title文字則建立bbcode物件
        config.title = scene.rexUI.add.BBCodeText(0, 0, config.title, { fontFamily: 'DFKai-SB', fontSize: 60 });
        SetValue(config, 'expand.title', false); //將title物件設定為不隨dialog的排版延展
    }

    if (typeof (config.content) === 'string') {
        //如果有content文字則建立bbcode物件(此例的content是一個new Character物件)
        config.content = scene.rexUI.add.BBCodeText(0, 0, config.content, { fontFamily: 'DFKai-SB', fontSize: 48 });
        SetValue(config, 'expand.content', false); //將content物件設定為不隨dialog的排版延展
    }

    if (config.buttonMode === undefined) { //按鈕模式，聯動控制modalPromise的manualClose設定是否手動關閉
        config.buttonMode = 0;
    }
    switch (config.buttonMode) {
        case 4: // onError訊息，顯示後遊戲停止
            config.actions = []; //不給按鈕，不會消失
            break;
        case 3: // mail/ok按鈕
            config.actions = [
                CreateButton(scene, 'mail').onClick(config.callbackMail),
                scene.rexUI.add.space(),
                CreateButton(scene, 'yes'),
            ];
            break;
        case 2: // OK/Cancel按鈕
            config.actions = [
                CreateButton(scene, 'yes').onClick(config.callbackYes),
                scene.rexUI.add.space(),
                CreateButton(scene, 'no').onClick(config.callbackNo),
            ];
            break;
        case 1: // OK按鈕
            config.actions = [
                scene.rexUI.add.space(),
                CreateButton(scene, 'yes'),
                scene.rexUI.add.space()
            ];
            break;
        default:
            config.actions = []; //不給按鈕，兩秒後自動消失
            break;
    }

    if (config.space === undefined) { //設定Modal的padding和字物件間距
        config.space = { left: 40, right: 40, top: 40, bottom: 40, item: 40 };
    }
/*
以上建立了： 
dialog config:{
    x: viewport.centerX,
    y: viewport.centerY, //在camera置中
    width: 0,
    height: 0, //寬高會由dialog排版自動決定，故預設值為0即可
    background: CreateRoundRectangleBackground(scene, 20, 0x0, 0xffffff, 2);,
    title:,
    content: characterUI, //一個new Character物件，包含bopomofo排版；或help文字內容
    expand: { 
        title: false, //bbcode物件不延展，否則會變形
        content: false, //bbcode物件不延展，否則會變形
    },
    buttonMode: 0, //無按鈕
    actions: [], //按鈕物件array
    space: { left: 40, right: 40, top: 40, bottom: 40, item: 20 },
}
*/
    var dialog = scene.rexUI.add.dialog(config);

    //將modal底板移到dialog的下層
    if (config.background) {
        dialog.moveDepthBelow(config.background);
    }

    return dialog;
}

var CreateButton = function (scene, img) {
    return scene.rexUI.add.label({
        // background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),
        icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
        // text: scene.rexUI.add.BBCodeText(0, 0, 'X', { fontFamily: 'DFKai-SB', fontSize: 60 }),
        // space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 },
    })
}

export default CreateModalDialog;