const GetValue = Phaser.Utils.Objects.GetValue;

var StyleQuestionCharacter = function (characterUI) {
    characterUI.setBopomofoVisible(false); // Or characterUI.setBopomofo()
    characterUI.getElement('character.text').setColor('chocolate');
}

var CreateQuiz = function (panel, config) {
    // word, characters
    var word = GetValue(config, 'word');
    var characters = word.getCharacters();

    // character, characterIndex
    var character = GetValue(config, 'character');
    var characterIndex;
    if (character === undefined) {
        characterIndex = Phaser.Math.Between(0, characters.length - 1);
        character = characters[characterIndex];
    } else if (typeof (character) === 'number') {
        characterIndex = character;
        character = characters[characterIndex];
    } else {
        characterIndex = word.getCharacterIndex(character);
        if (characterIndex === -1) {
            // Error : Character is not in Word
        }
    }

    // question
    var question = character.createQuestion();

    // Fill panel
    panel
        .setWord(characters)
        .setChoicesText(question.createChoices())

    var title = GetValue(config, 'title');
    if (title) {
        panel.setTitle(title);
    }

    // Layout positions
    panel.layout();

    panel
        .on('_submit', function (result) {
            var isPass = question.verify(result);
            if (!isPass) { // Verify polyphony
                var polyphonyCharacter = word.getCharacters(1)[characterIndex]; // Get polyphony character
                if (polyphonyCharacter) { // Has polyphony
                    isPass = question.setAnswer(polyphonyCharacter).verify(result);
                }
            }

            var verifyResult = {
                result: isPass,
                input: result,
                word: word,
                character: (isPass && polyphonyCharacter) ? polyphonyCharacter : character
            }
            panel.emit('complete', verifyResult);
        })

    // Style question character after layout()
    StyleQuestionCharacter(panel.getCharacter(characterIndex));

    return panel;
}

export default CreateQuiz;