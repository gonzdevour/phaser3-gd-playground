const GetValue = Phaser.Utils.Objects.GetValue;

var ResetWordStyle = function (word) {
    word.setWordColor('white');
}
var SetQuestionCharacterStyle = function (characterUI) {
    characterUI
        .setCharacterColor('chocolate')
        .setBopomofo();
}

var CreateQuiz = function (quizPanel, config) {
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

    // Fill quizPanel
    quizPanel
        .setWord(characters)
        .setChoicesText(question.createChoices())

    var title = GetValue(config, 'title');
    if (title) {
        quizPanel.setTitle(title);
    }

    // Layout positions
    quizPanel.layout();

    // TODO: Remove pending events
    quizPanel
        .once('_submit', function (result) {
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
            quizPanel.emit('complete', verifyResult);
        })

    // Style question character after layout()
    ResetWordStyle(quizPanel.getElement('word'));
    SetQuestionCharacterStyle(quizPanel.getCharacter(characterIndex));

    return quizPanel;
}

export default CreateQuiz;