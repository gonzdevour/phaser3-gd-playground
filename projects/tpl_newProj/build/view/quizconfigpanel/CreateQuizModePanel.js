import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import CreateTitleLabel from './CreateTitleLabel.js';
import { QuizModeOptions } from './Options.js'
import Style from '../../../settings/Style.js';

const PanelName = 'mode';

//utils
import GetValue from '../../../../../plugins/utils/object/GetValue.js';

var CreateQuizModePanel = function (scene, config) {   
    // Build UI
    var title = CreateTitleLabel(scene, '出題模式');

    /* 
    const QuizModeOptions = [
    '隨機',
    '頻次',
    '測驗'
    ]
    */
    var buttons = [];
    for (var i = 0, cnt = QuizModeOptions.length; i < cnt; i++) {
        var btn = CreateOptionLabel(scene, QuizModeOptions[i]);
        buttons.push(btn);
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
    choices.value = GetValue(config, `radio.${PanelName}`, '隨機');
    choices.setButtonEnable(2, false);//關閉隨機選項

    var panel = scene.rexUI.add.sizer({
        orientation: 'y',
        name: PanelName //'mode'
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

    return panel
}

var CreateOptionLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),
        // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
        text: scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: Style.fontFamilyName, fontSize: 60 }),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 },

        name: text   // !! Important: This value will be used as option name in choices sizer
    });
}

export default CreateQuizModePanel