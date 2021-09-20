import * as GO from '../gameobjects';
import CreateCharacter from './CreateCharacter';

const Word = GO.Word;

var CreateWord = function (scene) {
    return new Word(scene, {
        width: 150,
        orientation: 'y',

        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),

        characters: [
            CreateCharacter(scene), CreateCharacter(scene), CreateCharacter(scene), CreateCharacter(scene)
        ]
    })
}

export default CreateWord;