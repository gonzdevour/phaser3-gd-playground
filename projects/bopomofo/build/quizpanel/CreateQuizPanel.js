import CreateTitle from "./CreateTitle.js";
import CreateWord from "./CreateWord.js";
import CreateChoices from "./CreateChoices.js";
import CreateActions from "./CreateActions.js";
import { QuizPanel } from '../../gameobjects/quizpanel.js';
import { Style } from "../style/style.js";

var CreateQuizPanel = function (scene) {
    var quizPanel = new QuizPanel(scene, {
        width: 700,
        orientation: 'y',

        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),

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
    });

    // Integrated events
    quizPanel.getElement('footer')
        .on('button.click', function (button, index, pointer, event) {
            switch (index) {

                case 0: // Clear button
                    quizPanel.clearChoices();
                    break;

                case 1:  // OK button
                    var result = quizPanel.getChoiceResult();
                    quizPanel.emit('_submit', result);  // Fire internal event
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

export default CreateQuizPanel;