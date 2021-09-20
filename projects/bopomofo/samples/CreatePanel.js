import CreateWord from "./CreateWord";
import CreateChoices from "./CreateChoices";
import { Panel } from '../gameobjects';

var CreatePanel = function (scene) {
    return new Panel(scene, {
        width: 400,
        orientation: 'y',

        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
        word: CreateWord(scene),
        choices: CreateChoices(scene),
    });
}

export default CreatePanel;