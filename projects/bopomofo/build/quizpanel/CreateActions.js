import { Style } from '../style/style.js';

var CreateActions = function (scene) {
    return scene.rexUI.add.buttons({
        orientation: 'x',
        buttons: [
            CreateLabel(scene, '送出答案'),
            CreateLabel(scene, '清除選取'),
        ],
        space: {
            left: 0, right: 0, top: 0, bottom: 0, item: 40
        }
    })
}

var CreateLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, Style.quizPanel.bottom.round).setStrokeStyle(2, 0xffffff),
        icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10).setStrokeStyle(2, 0x0000ff),
        text: scene.rexUI.add.BBCodeText(0, 0, text, Style.quizPanel.action.submit),
        space: { left: 15, right: 5, top: 5, bottom: 5, icon: 10 }
    });
}

export default CreateActions;