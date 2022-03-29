import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import CreateTitleLabel from './CreateTitleLabel.js';
import ModalDialogPromise from '../modeldialog/ModalDialogPromise.js';
import { EnhanceOptions } from './Options.js'

//utils
import GetValue from '../../../../../plugins/utils/object/GetValue.js';

/* 
var DefaultQuizConfig = {
    database: '高頻詞庫', //指定詞庫種類
    enhancement: '無', //強化練習模式
    mode: '隨機' //頻次|隨機|測驗
}
*/
const PanelName = 'enhancement';

var CreateEnhancementSelectPanel = function (scene, config) {
    // Build UI
    var title = CreateTitleLabel(scene, '強化練習');
/* 
const EnhanceOptions = [
    'ㄓㄗ',
    'ㄔㄘ',
    'ㄕㄙ',
    'ㄛㄡ',
    'ㄝㄟ',
    'ㄢㄣ',
    'ㄣㄥ',
    '結合韻',
    '無',
]
*/
    var buttons = [];
    for (var i = 0, cnt = EnhanceOptions.length; i < cnt; i++) {
        buttons.push(
            CreateOptionLabel(scene, EnhanceOptions[i])
        )
    }

    //fixWidthButtons可以自動換行排列button
    var choices = scene.rexUI.add.fixWidthButtons({
        align: 'justify',
        // justifyPercentage: 1,
        // justify在rexUI中的規則是：當該行元素超過justifyPercentage時自動換行，否則左右對齊
        space: { line: 30, item: 30 },
        type: 'radio',
        buttons: buttons,
        setValueCallback: function (button, value, previousValue) {
            button.getElement('background')
                .setFillStyle((value) ? 0x8B4513 : undefined)
        },
    })
    //choices.value用法請見CreateDatabaseSelectPanel.js
    //將buttons radio的選項以預設值做設定
    choices.value = GetValue(config, `radio.${PanelName}`, '無');

    var panel = scene.rexUI.add.sizer({
        orientation: 'y',
        name: PanelName //'enhancement'
    })
        .add(
            title,
            { 
                proportion: 0, align: 'center', expand: true,
                key: 'title'
            }
        )
        .add(
            choices,
            {
                proportion: 0, align: 'center', expand: true,
                padding: { left: 80, right: 80, top: 30 },
                key: 'choices'
            }
        )

    return panel;
}


var CreateOptionLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),
        // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
        text: scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 }),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 },

        name: text   // !! button.name會被用在buttons.value的指定
    });
}

export default CreateEnhancementSelectPanel;