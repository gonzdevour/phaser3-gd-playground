import CreateRoundRectangleBackground from "../style/CreateRoundRectangleBackground.js";
import CreateTitle from "./CreateTitle.js";
import CreateWord from "./CreateWord.js";
import CreateChoices from "./CreateChoices.js";
import CreateActions from "./CreateActions.js";
import { QuizPanel } from '../../../gameobjects/quizpanel.js';
import { Style } from "../style/style.js";

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateQuizPanel = function (scene, config) {
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

        title: CreateTitle(scene),
        word: CreateWord(scene),
        choices: CreateChoices(scene),
        footer: CreateActions(scene),

        space: {
            title: 10,
            word: 10,
            choices: 10,
            bottom: 10,
        },

        expand: {
            footer: true
        }
    })

    // TODO: Add addition buttons on quiz panel's word block
    quizPanel.getElement('wordBlock')
        .add(
            CreateLabel(scene),
            {
                key: 'Btn',
                align: 'right-top',
                expand: false,
                offsetX: -40, offsetY: 40
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

var CreateLabel = function (scene) {
    return scene.rexUI.add.label({
        width: 100, height: 100,
        background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),        
    });
}

export default CreateQuizPanel;