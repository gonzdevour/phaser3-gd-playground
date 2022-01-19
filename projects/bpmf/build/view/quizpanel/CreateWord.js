import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import { Word } from '../../../gameobjects/quizpanel.js';
import CreateCharacter from './CreateCharacter';

//utils
import GetValue from '../../../../../plugins/utils/object/GetValue.js';

const MaxCharacters = 4; //1個詞最多支援4個字

var CreateWord = function (scene, config) {
    var wordConfig = {
        orientation: 'y',

        background: CreateRoundRectangleBackground(scene),
        space: { left: 30, right: 0, top: 0, bottom: 0, item: 0 },

        characters: [],
    }

    var characters = wordConfig.characters;
    var characterConfig = GetValue(config, 'character');
    for (var i = 0; i < MaxCharacters; i++) { //建立4個空的字物件後組成new Word
        characters.push(
            CreateCharacter(scene, characterConfig)
        )
    }

    var word = new Word(scene, wordConfig)
    word.layout().setMinHeight(word.height) // Height won't less then current height
    return word;
}

export default CreateWord;