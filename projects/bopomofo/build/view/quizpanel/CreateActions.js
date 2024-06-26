import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import { Style } from '../style/style.js';

var CreateActions = function (scene) {
    return scene.rexUI.add.buttons({
        orientation: 'x',
        buttons: [
            CreateLabel(scene, '清除選取', 'eraser', 'left'),
            scene.rexUI.add.space(),
            CreateLabel(scene, '送出答案', 'confirm', 'right'),
        ],
        space: {
            left: 10, right: 10, top: 0, bottom: 0, item: 10
        }
    })
}

var CreateLabel = function (scene, text, img, pos) {
    return scene.rexUI.add.label({
        background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
        icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
        //text: scene.rexUI.add.BBCodeText(0, 0, text, Style.quizPanel.action.submit),
        //space: { left: 15, right: 5, top: 5, bottom: 5, icon: 10 }
    });
}

export default CreateActions;