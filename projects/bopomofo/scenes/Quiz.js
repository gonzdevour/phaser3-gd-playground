import 'phaser';
import CreateModel from '../build/CreateModel.js';
import CreateQuizPanel from '../build/quizpanel/CreateQuizPanel.js';
import CreateQuiz from '../build/quizpanel/CreateQuiz.js';


class Quiz extends Phaser.Scene {
    constructor() {
        super({
            key: 'quiz'
        })

    }

    preload() {
        // Load db file
        this.load.text('db', 'assets/bopomofo.compress');
    }

    create() {
        var model = CreateModel({
            db: this.cache.text.get('db'),
        })

        var quizPanel = CreateQuizPanel(this)
            .setPosition(384, 667)
            .layout()

        console.log(`${quizPanel.width}x${quizPanel.height}`)

        var characters = model.characters.queryByBopomofo('ㄢㄣ');
        var character = Phaser.Utils.Array.GetRandom(characters);

        var word = character.getRandomWord();

        CreateQuiz(quizPanel, {
            word: word,
            character: character,
            title: '2021高頻詞600注音練習'
        })
            .drawBounds(this.add.graphics(), 0xff0000)
            .on('complete', function (result) {
                console.log(result)
            })

    }

    update() { }
}

export default Quiz;