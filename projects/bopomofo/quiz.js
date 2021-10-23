import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';
import CreateModel from './build/model/CreateModel.js';
import CreateQuizPanel from './build/quizpanel/CreateQuizPanel.js';
import BuildQuiz from './build/quiz/BuildQuiz.js';
import SetupQuizPanel from './build/quiz/SetupQuizPanel.js';

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
    }

    create() {
        var model = CreateModel({
            db: [
                this.cache.text.get('db0'),
                this.cache.text.get('db1'),
            ]
        })

        var gameConfig = this.game.config;
        var gameWindowWidth = gameConfig.width;
        var gameWindowHeight = gameConfig.height;
        var quizPanel = CreateQuizPanel(this)
            .setPosition(gameWindowWidth / 2, gameWindowHeight / 2)
            .setMinSize(gameWindowWidth, gameWindowHeight)
            .layout()

        console.log(`${quizPanel.width}x${quizPanel.height}`)

        // Set quizConfig manually
        // var quizConfig = model.quizConfig;
        // quizConfig.database = '常用詞庫';
        // quizConfig.enhancement = 'ㄔㄘ';
        // quizConfig.mode = '依序';
        // var quiz = BuildQuiz(model);

        // Test 2->4 word layout case
        var quiz = model.quiz;
        quiz
            .clearQuestions()
            .addQuestion({
                word: model.db[1].words.queryWord('嘗試')[0]
            })
            .addQuestion({
                word: model.db[1].words.queryWord('松柏常青')[0]
            })

        // Chain questions
        var OnSubmit = function (result) {
            console.log(result)
            if (!quiz.isLastQuestion) {
                SetupQuizPanel(quizPanel, quiz.nextQuestion, OnSubmit);
            } else {
                console.log('Quiz complete')
            }
        }
        SetupQuizPanel(quizPanel, quiz.nextQuestion, OnSubmit);
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
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Test
};

var game = new Phaser.Game(config);