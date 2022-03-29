import CreateRoundRectangleBackground from "../style/CreateRoundRectangleBackground.js";
import CreateTitle from "./CreateTitle.js";
import CreateWord from "./CreateWord.js";
import CreateChoices from "./CreateChoices.js";
import CreateActions from "./CreateActions.js";
import { QuizPanel } from '../../../gameobjects/quizpanel.js';
import { Style } from "../style/style.js";
import RegisterLabelAsButton from "../../../behavior/Button/RegisterLabelAsButton.js";

//utils
import GetValue from '../../../../../plugins/utils/object/GetValue.js';

//Style指定
let quizPanelStyle = Style.quizPanel;

//建立quizPanel並掛上事件，這裡的物件群都不帶內容(除了title之外)
//物件群內容在build/control/quiz/SetupQuizPanel中依QuizPromise的參數而設定
var CreateQuizPanel = function (scene, config) {  
    //console.log('CreateQuizPanel config:' + '\n' + JSON.stringify(config));
    var viewport = scene.rexScaleOuter.outerViewport;
    var x = GetValue(config, 'x', viewport.centerX);
    var y = GetValue(config, 'y', viewport.centerY);
    var width = GetValue(config, 'width', viewport.width);
    var height = GetValue(config, 'height', viewport.height);

    //直橫版尺寸調整
    var displayWidth = width>height?(height/1.6):width;
    var displayHeight = height;

    //word style指定
    var wordConfig = {
        orientation: 'y',
        background: CreateRoundRectangleBackground(scene),
        space: { left: 30, right: 0, top: 0, bottom: 0, item: 0 },
        style: GetValue(Style, 'quizPanel'),
        maxCharacters: 4, //1個詞最多支援4個字
        characters: [],
    }

    var qidxtext = CreateTextLabel(scene, '');

    var quizPanel = new QuizPanel(scene, {
        x: x, y: y,
        width: displayWidth, height: displayHeight,
        orientation: 'y',

        background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),

        title: CreateTitle(scene, config),
        word: CreateWord(scene, wordConfig),
        choices: CreateChoices(scene),
        footer: CreateActions(scene),

        space: {
            title: 0,
            word: 10,
            choices: 10,
            bottom: 10,
        },

        expand: {
            footer: true
        }
    });

    //在word區塊的overlapSizer上添加語音按鈕

    var btnSpeak = CreateLabel(scene, '發音', 'speak')
    RegisterLabelAsButton(btnSpeak, 'ttsSpeak', quizPanel);

    quizPanel.getElement('wordArea')
        .add(
            btnSpeak,{
                key: 'btnSpeak',
                align: 'left-bottom',
                expand: false,
                offsetX: 20, offsetY: -20
            }
        )
        .add(
            qidxtext,{
                key: 'qidxtext',
                align: 'right-top',
                expand: false,
                //offsetX: 20, offsetY: 20
            }
        )
        //.addChildrenMap('qidxtext', qidxtext)    

    //清除答案與送出答案
    quizPanel.getElement('footer')
        .on('button.click', function (button, index, pointer, event) {
            switch (index) { //index是button在buttons裡的產生順序

                case 0: // Clear button
                    quizPanel.clearChoices();
                    break;

                case 1:  // OK button
                    var result = quizPanel.getChoiceResult();
                    quizPanel.emit('submit', result);  // Fire internal event
                    break;


            }
        })

    //在SetupQuizPanel時，會quizPanel.setData('focusCharacterIndex', question.characterIndex)
    //此時接收到事件的字會變色並清除該字旁邊的注音
    quizPanel
        .setData('focusCharacterIndex', null)
        .on('changedata-focusCharacterIndex', function (gameObject, value, previousValue) {
            quizPanel
                .setWordColor(quizPanelStyle.word.normalColor) //重設所有字的顏色
                .setCharacterColor(value, quizPanelStyle.word.focusColor) //設定題目字的顏色
                .clearCharacterBopomofo(value) //清除題目字旁邊的注音
        })

    //選項選取狀態改變時，設定題目字旁邊的注音
    quizPanel.getElement('choices')
        .on('change', function (result) {
            var index = quizPanel.getData('focusCharacterIndex');
            if (index == null) { //題目字必須存在
                return;
            }
            quizPanel
                //取得目前選項選取狀態JSON，設定題目字旁邊的注音
                .setCharacterBopomofo(index, quizPanel.getChoiceResult())
                //※注意gameobjects/bopomofo/Bopomofo.js的setText自訂函數會用show/hide控制排版
                .layoutCharacter(index)
        })

    return quizPanel;
}

var CreateLabel = function (scene, text, img, pos) {
    return scene.rexUI.add.label({
        background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),
        icon: scene.add.image(0, 0, img).setDisplaySize(45, 60),
        text: scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 }),
        space: { left: 20, right: 0, top: 20, bottom: 20, icon: 10 }
    });
}

var CreateTextLabel = function (scene, text, img, radius, pos) {
    return scene.rexUI.add.label({
        //background: CreateRoundRectangleBackground(scene, Style.quizPanel.top.round, undefined, 0xffffff, 2),
        //icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10).setStrokeStyle(2, 0x0000ff),
        text: scene.rexUI.add.BBCodeText(0, 0, text, quizPanelStyle.qidxtext),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 0 }
    })
}

export default CreateQuizPanel;