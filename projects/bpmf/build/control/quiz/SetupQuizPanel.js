var SetupQuizPanel = function (quizPanel, question, onSubmit) {
    // Fill quizPanel
    quizPanel
        .clearChoices()
        .setTitle(question.title)
        .setWord(question.characters)
        .setChoicesText(question.createChoices())
        .layout()

    // Note: make sure 'submit' is emitted (OK button clicked)    
    quizPanel
        .setData('focusCharacterIndex', question.characterIndex) // See CreateQuizPanel.js
        .once('submit', function (result) {
            var isPass = question.verify(result);
            if (!isPass) { // Verify polyphony
                var polyphonyCharacter = question.getPolyphonyCharacter();
                if (polyphonyCharacter) { // Has polyphony
                    isPass = question.setAnswer(polyphonyCharacter).verify(result);
                }
            }

            var verifyResult = {
                result: isPass,
                input: result,
                word: question.word,
                character: (isPass && polyphonyCharacter) ? polyphonyCharacter : question.character
            }

            if (onSubmit) {
                onSubmit(verifyResult);
            }
        })

    return quizPanel;
}

export default SetupQuizPanel;