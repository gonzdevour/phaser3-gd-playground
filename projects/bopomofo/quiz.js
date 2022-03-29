import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';
import CreateModel from './build/model/CreateModel.js';
import BuildQuiz from './build/control/quiz/BuildQuiz.js';
import CreateQuizPanel from './build/view/quizpanel/CreateQuizPanel.js';
import QuizPromise from './build/control/quiz/QuizPromose.js';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'quiz'
        })

    }

    preload() {
        // Load db file
        this.load.text('db0', 'assets/db0.compress');
        this.load.text('db1', 'assets/db1.compress');

        // Load sound file
        this.load.audio('ok', [
            'assets/sound/right.ogg',
            'assets/sound/right.m4a'
        ]);
        //Load image file
        this.load.image('confirm', 'assets/img/confirm.png');
        this.load.image('eraser', 'assets/img/eraser.png');

        this.load.image('yes', 'assets/img/yes.png');
    }

    create() {
        var model = CreateModel({
            db: [
                this.cache.text.get('db0'),
                this.cache.text.get('db1'),
            ]
        })

        this.rexScaleOuter.scale();
        var quizPanel = CreateQuizPanel(this).layout();

        console.log(`${quizPanel.width}x${quizPanel.height}`)

        // Set quizConfig manually
        // model.quizConfig.set({
        //     database: '常用詞庫',
        //     enhancement:'ㄔㄘ',
        //     mode: '依序'
        // })
        // var quiz = BuildQuiz(model);

        // Test 2->4 word layout case
        var quiz = model.quiz;
        quiz
            .clearQuestions()
            .addQuestion({
                word: model.db[1].words.queryWord('厚薄')[0]
            })
            // .addQuestion({
            //     word: model.db[1].words.queryWord('松柏常青')[0]
            // })

        QuizPromise(quizPanel, quiz, model)
            .then(function () {
                console.log('Quiz complete');
            })
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 768,
    height: 1334,
    scale: {
        // mode: Phaser.Scale.ENVELOP,
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Test
};

var game = new Phaser.Game(config);