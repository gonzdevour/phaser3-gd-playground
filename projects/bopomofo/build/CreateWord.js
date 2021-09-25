import { Word } from '../gameobjects';
import CreateCharacter from './CreateCharacter';

const MaxCharacters = 4;
const GetValue = Phaser.Utils.Objects.GetValue;

var CreateWord = function (scene, config) {
    var wordConfig = {
        width: 300,
        orientation: 'y',

        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 0),//.setStrokeStyle(2, 0xffffff),

        characters: [],
    }

    var characters = wordConfig.characters;
    var characterConfig = GetValue(config, 'character');
    for (var i = 0; i < MaxCharacters; i++) {
        characters.push(
            CreateCharacter(scene, characterConfig)
        )
    }

    var word = new Word(scene, wordConfig)
    word.layout().setMinHeight(word.height) // Height won't less then current height
    return word;
}

export default CreateWord;