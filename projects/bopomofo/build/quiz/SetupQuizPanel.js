var SetupQuizPanel = function (quizPanel, question) {
    // Fill quizPanel
    quizPanel
        .setTitle(question.title)
        .setWord(question.characters)
        .setChoicesText(question.getChoices())
        .layout()

    // Warning: '_submit' callback won't be removed
    // Note: make sure '_submit' is emitted (OK button clicked)    
    quizPanel
        .setData('focusCharacterIndex', question.characterIndex) // See CreateQuizPanel.js
        .once('_submit', function (result) {
            var isPass = question.verify(result);
            if (!isPass) { // Verify polyphony
                var word = question.word;                
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
            quizPanel.emit('complete', verifyResult);
        })

    return quizPanel;
}

export default SetupQuizPanel;