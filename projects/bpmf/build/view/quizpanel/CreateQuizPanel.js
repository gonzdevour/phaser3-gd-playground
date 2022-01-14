import CreateRoundRectangleBackground from "../style/CreateRoundRectangleBackground.js";
import CreateTitle from "./CreateTitle.js";
import CreateWord from "./CreateWord.js";
import CreateChoices from "./CreateChoices.js";
import CreateActions from "./CreateActions.js";
import { QuizPanel } from '../../../gameobjects/quizpanel.js';
import { Style } from "../style/style.js";

//utils
import GetValue from '../../../../../plugins/utils/object/GetValue.js';

//建立quizPanel並掛上事件，這裡的物件群都不帶內容(除了title之外)
//物件群內容在build/control/quiz/SetupQuizPanel中依QuizPromise的參數而設定
var CreateQuizPanel = function (scene, config) {
    console.log('CreateQuizPanel config:' + '\n' + JSON.stringify(config));
    var viewport = scene.rexScaleOuter.outerViewport;
    var x = GetValue(config, 'x', viewport.centerX);
    var y = GetValue(config, 'y', viewport.centerY);
    var width = GetValue(config, 'width', viewport.width);
    var height = GetValue(config, 'height', viewport.height);

    var quizPanel = new QuizPanel(scene, {
        x: x, y: y,
        width: width, height: height,
        orientation: 'y',

        background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),

        title: CreateTitle(scene, config),
        word: CreateWord(scene),
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

    // TODO: Add addition buttons on quiz panel's word block
    quizPanel.getElement('wordArea')
        .add(
            CreateLabel(scene, '發音')
                .onClick( function (button, index, pointer, event) {
                    quizPanel.emit('ttsSpeak', scene);
                }),
            {
                key: 'btnSpeak',
                align: 'left-top',
                expand: false,
                offsetX: 20, offsetY: 20
            }
        )    

    // Integrated events
    quizPanel.getElement('footer')
        .on('button.click', function (button, index, pointer, event) {
            switch (index) {

                case 0: // Clear button
                    quizPanel.clearChoices();
                    break;

                case 1:  // OK button
                    var result = quizPanel.getChoiceResult();
                    quizPanel.emit('submit', result);  // Fire internal event
                    break;


            }
        })

    // Focus character
    quizPanel
        .setData('focusCharacterIndex', null)
        .on('changedata-focusCharacterIndex', function (gameObject, value, previousValue) {
            quizPanel
                .setWordColor(Style.quizPanel.word.normalColor)
                .setCharacterColor(value, Style.quizPanel.word.focusColor)
                .clearCharacterBopomofo(value)
        })

    // Set bopomofo of focus character
    quizPanel.getElement('choices')
        .on('change', function (result) {
            var index = quizPanel.getData('focusCharacterIndex');
            if (index == null) {
                return;
            }
            quizPanel
                .setCharacterBopomofo(index, quizPanel.getChoiceResult())
                .layoutCharacter(index)
        })

    return quizPanel;
}

var CreateLabel = function (scene, text, img, pos) {
    return scene.rexUI.add.label({
        background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),
        // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
        text: scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 }),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 }
    });
}

//onClick是sizer的method，Label是一種sizer
//emit是所有p3 gameObject都有的method，從ee3導入
//※這裡設計成：按下Label時，觸發backgroundOverlapSizery在MainMenu scene掛載的.on('eventName', callback)
var RouteClickEvent = function (gameObject, eventName, eventEmitter) {
    gameObject.onClick(function (button, gameObject, pointer, event) {
        eventEmitter.emit(eventName, gameObject, pointer, event);
    })
}

export default CreateQuizPanel;