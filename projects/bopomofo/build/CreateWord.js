import { Word } from '../gameobjects';
import CreateCharacter from './CreateCharacter';

var CreateWord = function (scene) {
    return new Word(scene, {
        width: 300,
        orientation: 'y',

        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 0),//.setStrokeStyle(2, 0xffffff),

        characters: [
            CreateCharacter(scene), CreateCharacter(scene), CreateCharacter(scene), CreateCharacter(scene)
        ]
    })
}

export default CreateWord;