import 'phaser';
import Base from './Base.js';
import { QuizSceneKey } from './Const.js';
import CreateQuizPanel from '../build/quizpanel/CreateQuizPanel.js';
import BuildQuiz from '../build/quiz/BuildQuiz.js';
import SetupQuizPanel from '../build/quiz/SetupQuizPanel.js';

// Run quiz
class Quiz extends Base {
    constructor() {
        super({
            key: QuizSceneKey
        })

    }

    preload() {
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
        var gameConfig = this.game.config;
        var gameWindowWidth = gameConfig.width;
        var gameWindowHeight = gameConfig.height;
        var quizPanel = CreateQuizPanel(this)
            .setPosition(gameWindowWidth / 2, gameWindowHeight / 2)
            .setMinSize(gameWindowWidth, gameWindowHeight)
            .layout()

        console.log(`${quizPanel.width}x${quizPanel.height}`)

        var quiz = BuildQuiz(this.model);

        SetupQuizPanel(quizPanel, quiz.nextQuestion)
            .drawBounds(this.add.graphics(), 0xff0000)
            .on('complete', function (result) {
                console.log(result)
            })

    }

    update() { }
}

export default Quiz;