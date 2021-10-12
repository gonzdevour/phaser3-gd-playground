import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import { Word } from '../../gameobjects/quizpanel.js';
import CreateCharacter from './CreateCharacter';

const MaxCharacters = 4;
const GetValue = Phaser.Utils.Objects.GetValue;

var CreateWord = function (scene, config) {
    var wordConfig = {
        orientation: 'y',

        background: CreateRoundRectangleBackground(scene),
        space: { left: 30, right: 0, top: 0, bottom: 0, item: 0 },

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