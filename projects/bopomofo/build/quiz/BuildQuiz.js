import { Bopomofo } from '../../model/bopomofo/Bopomofo.js';

const Shuffle = Phaser.Utils.Array.Shuffle;

var BuildQuiz = function (model) {
    var quizConfig = model.quizConfig;
    var dbIndex = DBIndexMap[quizConfig.database];
    var enhancementMode = quizConfig.enhancement;
    var quizMode = quizConfig.mode;

    var db = model.db[dbIndex];

    var filter = {};
    var choices;
    switch (enhancementMode) {
        case '無':
            break;

        case '結合韻':
            filter.media = { '$ne': '' };
            filter.vowel = { '$ne': '' };
            break;

        default:
            var bopomofo = enhancementMode;
            for (var i = 0, cnt = bopomofo.length; i < cnt; i++) {
                var char = bopomofo.charAt(i);
                for (var typeName in Bopomofo) {
                    if (Bopomofo[typeName].indexOf(char) !== -1) {
                        if (!filter.hasOwnProperty(typeName)) {
                            filter[typeName] = [];
                        }
                        filter[typeName].push(char);
                    }
                }
            }

            for (var typeName in filter) {
                if (filter[typeName].length === 1) {
                    filter[typeName] = filter[typeName][0];
                } else {
                    filter[typeName] = { '$in': filter[typeName] };
                }
            }
            choices = bopomofo;
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

const DBIndexMap = {
    '高頻詞庫': 0,
    '常用詞庫': 1
}

export default BuildQuiz;