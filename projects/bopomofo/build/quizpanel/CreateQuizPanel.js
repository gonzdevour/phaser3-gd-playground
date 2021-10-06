import CreateWord from "./CreateWord";
import CreateChoices from "./CreateChoices";
import { QuizPanel } from '../../gameobjects/quizpanel.js';
import { Style } from "../style/style";

var CreateQuizPanel = function (scene) {
    var quizPanel = new QuizPanel(scene, {
        width: 700,
        orientation: 'y',

        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),

        title: scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, Style.quizPanel.top.round).setStrokeStyle(2, 0xffffff),
            icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10).setStrokeStyle(2, 0x0000ff),
            text: scene.rexUI.add.BBCodeText(0, 0, '', Style.quizPanel.title),
            space: { left: 15, right: 5, top: 5, bottom: 5, icon: 10 }
        }),

        word: CreateWord(scene),
        choices: CreateChoices(scene),

        actions: [
            CreateButton(scene, '送出答案'),
            CreateButton(scene, 'xxxxxxx')
        ],

        space: {
            title: 10,
            word: 10,
            choices: 10,
            action: {
                left: 0, right: 50, items: 20
            }
        }
    });

    quizPanel
        .on('button.click', function (button, index, pointer, event) {
            if (index === 0) {  // OK button
                var result = quizPanel.getChoiceResult();
                quizPanel.emit('_submit', result);  // Fire internal event
            }
        })

    return quizPanel;
}

var CreateButton = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, Style.quizPanel.bottom.round).setStrokeStyle(2, 0xffffff),
        icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10).setStrokeStyle(2, 0x0000ff),
        text: scene.rexUI.add.BBCodeText(0, 0, text, Style.action.submit),
        space: { left: 15, right: 5, top: 5, bottom: 5, icon: 10 }
    });
}

export default CreateQuizPanel;