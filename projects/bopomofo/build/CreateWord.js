import { Word } from '../gameobjects';
import CreateCharacter from './CreateCharacter';

const MaxCharacters = 4;

var CreateWord = function (scene) {
    var config = {
        width: 300,
        orientation: 'y',

        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 0),//.setStrokeStyle(2, 0xffffff),

        characters: [],
    }

    var characters = config.characters;
    for (var i = 0; i < MaxCharacters; i++) {
        characters.push(
            CreateCharacter(scene)
        )
    }

    var word = new Word(scene, config)
    word.layout().setMinHeight(word.height) // Height won't less then current height
    return word;
}

export default CreateWord;