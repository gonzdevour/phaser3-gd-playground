var SetupQuizPanel = function (quizPanel, question, onSubmit) {
    // Fill quizPanel
    quizPanel
        // 4. fire 'clear-events', to turn off events
        .emit('clear-events')
        .clearChoices()
        .setTitle(question.title)
        .setWord(question.characters)
        .setChoicesText(question.createChoices())
        .layout()

    // 1. Create a named callback
    // var callback = function () { }
    // Note: make sure 'submit' is emitted (OK button clicked)
    quizPanel
        .setData('focusCharacterIndex', question.characterIndex) // See CreateQuizPanel.js
        .once('submit', function (result) {
            let polyphonyCharacter = undefined;
            let isPass = question.verify(result);
            if (!isPass) { // Verify polyphony
                polyphonyCharacter = question.getPolyphonyCharacter();
                if (polyphonyCharacter) { // Has polyphony
                    isPass = question.setAnswer(polyphonyCharacter).verify(result);
                }
            }

            let verifyResult = {
                result: isPass,
                input: result,
                word: question.word,
                character: (isPass && polyphonyCharacter) ? polyphonyCharacter : question.character
            }

            if (onSubmit) {
                onSubmit(verifyResult);
            }
        })

        // 2. register event using this named callback
        // .on('eventName', callback)        
        .once('clear-events', function () {
            // 3. remove event callback in 'clear-events' event
            // quizPanel.off('eventName', callback);
        })

    return quizPanel;
}

export default SetupQuizPanel;