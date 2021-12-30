import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import CreateTitleLabel from './CreateTitleLabel.js';
import ModalDialogPromise from '../modeldialog/ModalDialogPromise.js';
import { DataBaseOptions } from './Options.js'

//utils
import GetValue from '../../../../../plugins/utils/object/GetValue.js';

const PanelName = 'database'; //用來取得config.database|enhancement|mode的key name

/* 
QuizConfig.js:
    var quizConfigPanel = CreateQuizConfigPanel(this, {
        radio: this.model.getQuizConfig() 
        //這裡的config，從model的現存參數來，預設值為：
        //var DefaultQuizConfig = {
        //    database: '高頻詞庫', //指定詞庫種類
        //    enhancement: '無', //強化練習模式
        //    mode: '隨機' //依序|隨機|測驗
        //}
        //選擇選項後會存入ls
    })
→
CreateQuizConfigPanel.js:
    CreateQuizConfigPanel(scene, config)
→
CreateDatabaseSelectPanel(scene, config)
*/
var CreateDatabaseSelectPanel = function (scene, config) {
    // Build UI
    var title = CreateTitleLabel(scene, '詞庫選擇'); //建立詞庫標題與help按鈕

    var buttons = [];
/* 
const DataBaseOptions = [
    { title: '高頻詞庫', description: '參照教育部公布之詞頻總表' },
    { title: '常用詞庫', description: '分類整理生活中的常見用詞' },
]
*/
    for (var i = 0, cnt = DataBaseOptions.length; i < cnt; i++) { //依詞庫Option建立按鈕label array
        var option = DataBaseOptions[i];
        buttons.push(
            CreateOptionLabel(scene, option.description, option.title) //return sizer.name = option.title詞庫名稱
        )
    }
    var choices = scene.rexUI.add.buttons({ //將按鈕label array傳入buttons自動排版
        orientation: 'y', //x排滿後排到下一列
        type: 'radio', //toggle選項
        expand: true,
        space: { item: 20 }, //間隔
        buttons: buttons, //按鈕label array
        setValueCallback: function (button, value, previousValue) { //用choice.value產生的數值變化來觸發
            button.getElement('button.background') //選中時button底板變色
                .setFillStyle((value) ? 0x8B4513 : undefined)
        },
    })

    /* 
    config: 
        {radio: {
                database: '高頻詞庫', //指定詞庫種類
                enhancement: '無', //強化練習模式
                mode: '隨機' //依序|隨機|測驗
            }
        }    
    ※魔法！radio的操作：
    buttons.value //取得選中的button.name
    buttons.value = key //選取button.name == key的button
    https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ui-buttons/#radio

    從config取得詞庫名稱，choices.value選擇button.name == 詞庫名稱的button，觸發該button底板變色效果
    */
    //2021.12.30新增buttons.setSelectedButtonName方法，功能與buttons.value相同
    //choices.value = GetValue(config, `radio.${PanelName}`, '高頻詞庫');
    choices.setSelectedButtonName(GetValue(config, `radio.${PanelName}`, '高頻詞庫'));

    var panel = scene.rexUI.add.sizer({ //將title和choices組成面板sizer
        orientation: 'y',
        name: PanelName //panel.name: 'database'
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

    // help button callback
    title.getElement('help').onClick(function () {
        ModalDialogPromise(scene, {
            title: '詞庫選擇',
            content: `
                      高頻：參照教育部公布之詞頻總表
                      常用：分類整理生活中的常見用詞\
                      `,
            buttonMode: 1,

            width: scene.rexScaleOuter.outerViewport.width-50,
        })
    })

    return panel

}

/* 
const DataBaseOptions = [
    { title: '高頻詞庫', description: '參照教育部公布之詞頻總表' },
    { title: '常用詞庫', description: '分類整理生活中的常見用詞' },
]
CreateOptionLabel(scene, option.description, option.title)
*/
var CreateOptionLabel = function (scene, title, text) {
    return scene.rexUI.add.sizer({
        orientation: 'y',
        space: { item: 10 },
        // !! Important: name will be used as option name in choices sizer
        name: text //option.title
    })
/*         .add( //option.description bbcodeText
            scene.rexUI.add.BBCodeText(0, 0, title, { fontFamily: 'DFKai-SB', fontSize: 50 }),
            { align: 'center', key: 'title' }
        ) */
        .add( //option.title label
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