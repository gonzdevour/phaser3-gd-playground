import GetBopomofoFilter from '../../model/db/characters/query/GetBopomofoFilter.js';
import GetCombinedRhyme from '../../model/db/characters/query/GetCombinedRhyme.js';

const Shuffle = Phaser.Utils.Array.Shuffle;

var BuildQuiz = function (model) {
    var quizConfig = model.quizConfig;
    var dbName = quizConfig.database;
    var enhancementMode = quizConfig.enhancement;
    var quizMode = quizConfig.mode;

    var db;
    switch (dbName) {
        case '高頻詞庫':
            db = model.db[0];
            break;

        case '常用詞庫':
            db = model.db[1];
            break;
    }

    var filter = {};
    var choices;
    switch (enhancementMode) {
        case '無':
            break;

        case '結合韻':
            filter = GetCombinedRhyme(filter);
            break;

        default:
            filter = GetBopomofoFilter(enhancementMode, filter);
            choices = enhancementMode;
            break;
    }

    var characters = db.characters.query(
        filter,
        'bopomofo'
    );

    switch (quizMode) {
        case '隨機':
            Shuffle(characters);
            break;

        case '測驗':
            //TODO
            Shuffle(characters);
            break;
    }

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