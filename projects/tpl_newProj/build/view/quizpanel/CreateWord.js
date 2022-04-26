import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import { Word } from '../../../gameobjects/quizpanel.js';
import CreateCharacter from './CreateCharacter';

//utils
import GetValue from '../../../../../plugins/utils/object/GetValue.js';

var CreateWord = function (scene, config) {
    var characters = GetValue(config, 'characters', []);
    var maxCharacters = GetValue(config, 'maxCharacters', 4);
    var characterStyle = GetValue(config, 'style', undefined);
    var characterConfig = {
        //character: GetValue(config, 'character'),
        style: characterStyle,
    }
    for (var i = 0; i < maxCharacters; i++) { //建立N個空的字物件後組成new Word
        characters.push(
            CreateCharacter(scene, characterConfig)
        )
    }

    var word = new Word(scene, config)
    //先layout一次，以layout結果作為MinHeight，往後如果字數少於N且再layout時，就不會小於這個高度
    word.layout().setMinHeight(word.height)
    return word;
}

export default CreateWord;