import GetBopomofoFilter from '../../../model/db/characters/query/GetBopomofoFilter.js';
import GetCombinedRhyme from '../../../model/db/characters/query/GetCombinedRhyme.js';

const Shuffle = Phaser.Utils.Array.Shuffle;

var BuildQuiz = function (model) {
    var quizConfig = model.quizConfig.get();

    // See build/view/quizconfigpanel/Options.js, DataBaseOptions
    var dbName = quizConfig.database;
    var db;
    switch (dbName) {
        case '高頻詞庫':
            db = model.db[0];
            break;

        case '常用詞庫':
            db = model.db[1];
            break;
    }

    // See build/view/quizconfigpanel/Options.js, EnhanceOptions
    var enhancementMode = quizConfig.enhancement;
    var filter;   // Query character-collection
    var choices;  // Set choice buttons
    switch (enhancementMode) {
        case '無':
            filter = {};
            break;

        case '結合韻':
            filter = GetCombinedRhyme();
            break;

        default:
            filter = GetBopomofoFilter(enhancementMode);
            choices = enhancementMode;
            break;
    }

    var characters = db.characters.query(
        filter,
    );

    // See build/view/quizconfigpanel/Options.js, QuizModeOptions
    var quizMode = quizConfig.mode;
    switch (quizMode) {
        case '隨機':
            Shuffle(characters);
            break;

        case '依序':
            // Or sort by freq in characters.query(...)
            characters.sort(function (characterA, characterB) {
                return characterA.freq - characterB.freq;
            })
            break;

        case '測驗':
            //TODO
            Shuffle(characters);
            break;
    }

    // Now we have quiz characters
    // Clear and add these characters
    var quiz = model.quiz;
    quiz.clearQuestions();

    for (var i = 0, cnt = characters.length; i < cnt; i++) {
        quiz.addQuestion({
            title: '', // TODO
            character: characters[i],
            choices: choices
        })
    }

    return quiz;
}

export default BuildQuiz;