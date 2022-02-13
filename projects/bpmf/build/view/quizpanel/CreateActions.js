import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import { Style } from '../style/style.js';

//建立橫向左右對齊的清除與送出按鈕
var CreateActions = function (scene) {
    return scene.rexUI.add.buttons({
        orientation: 'x',
        buttons: [
            CreateLabel(scene, '清除選取', 'eraser'),
            scene.rexUI.add.space(),
            CreateLabel(scene, '送出答案', 'confirm'),
        ],
        space: {
            left: 20, right: 20, top: 10, bottom: 10, item: 10
        }
    })
}

var CreateLabel = function (scene, text, img) {
    return scene.rexUI.add.label({
        background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
        icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
        //text: scene.rexUI.add.BBCodeText(0, 0, text, Style.quizPanel.action.submit),
        //space: { left: 15, right: 5, top: 5, bottom: 5, icon: 10 }
    });
}

export default CreateActions;