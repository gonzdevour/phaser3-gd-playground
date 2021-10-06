import { Style } from '../style/style.js';

var CreateTitle = function (scene) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, Style.quizPanel.top.round).setStrokeStyle(2, 0xffffff),
        icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10).setStrokeStyle(2, 0x0000ff),
        text: scene.rexUI.add.BBCodeText(0, 0, '', Style.quizPanel.title),
        space: { left: 15, right: 5, top: 5, bottom: 5, icon: 10 }
    })
}

export default CreateTitle;