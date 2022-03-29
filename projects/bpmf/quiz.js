import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';
import Base from './scenes/Base.js';
import { MainMenuSceneKey, QuizConfigSceneKey, QuizSceneKey, ResultSceneKey } from './scenes/Const.js';
import ModalDialogPromise from './build/view/modeldialog/ModalDialogPromise.js';
import CreateQuizPanel from './build/view/quizpanel/CreateQuizPanel.js';
import CreateModel from './build/model/CreateModel.js';
import BuildQuiz from './build/control/quiz/BuildQuiz.js';
import QuizPromise from './build/control/quiz/QuizPromise.js';

var api;
var assetPack = {};

class Test extends Base {
    constructor() {
        super({
            key: 'quiz'
        })

    }

    preload() {
        // Load db file
        this.load.text('db0', 'assets/text/db0.compress');
        this.load.text('db1', 'assets/text/db1.compress');

        // Load sound file
        this.load.audio('ok', [
            'assets/audio/right.ogg',
            'assets/audio/right.m4a'
        ]);
        //Load image file
        this.load.image('confirm', 'assets/image/confirm.png');
        this.load.image('eraser', 'assets/image/eraser.png');

        this.load.image('yes', 'assets/image/yes.png');
    }

    create() {
        var model = CreateModel({
            db: [
                this.cache.text.get('db0'),
                this.cache.text.get('db1'),
            ],
            api
        })

        this.rexScaleOuter.scale();
        var quizPanel = CreateQuizPanel(this).layout();

        console.log(`${quizPanel.width}x${quizPanel.height}`)

        // Set quizConfig manually
        // model.setQuizConfig({
        //     database: '常用詞庫',
        //     enhancement:'ㄔㄘ',
        //     mode: '頻次'
        // })
        // var quiz = BuildQuiz(model);

        // Test 2->4 word layout case
        var quiz = model.quiz;
        quiz
            .clearQuestions()
            .addQuestion({
                word: model.db[1].words.queryWord('厚薄')[0]
            })
            .addQuestion({
                word: model.db[1].words.queryWord('蘋果')[0]
            })

        QuizPromise(quizPanel, quiz)
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