import CreateTitle from "./CreateTitle.js";
import CreateWord from "./CreateWord.js";
import CreateChoices from "./CreateChoices.js";
import CreateActions from "./CreateActions.js";
import { QuizPanel } from '../../gameobjects/quizpanel.js';
import { Style } from "../style/style";

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
        }
    });

    quizPanel.getElement('footer')
        .on('button.click', function (button, index, pointer, event) {
            if (index === 0) {  // OK button
                var result = quizPanel.getChoiceResult();
                quizPanel.emit('_submit', result);  // Fire internal event
            }
        })

    return quizPanel;
}

export default CreateQuizPanel;