import 'phaser';
import Base from './Base.js';
import { QuizSceneKey } from './Const.js';
import CreateQuizPanel from '../build/quizpanel/CreateQuizPanel.js';
import BuildQuiz from '../build/quiz/BuildQuiz.js';
import SetupQuizPanel from '../build/quiz/SetupQuizPanel.js';
import QuizResultModalPromise from '../build/quizpanel/QuizResultModalPromise.js';

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

        // Test-pass dialog
        this.load.image('yes', 'assets/img/yes.png');
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

        // Chain questions
        var scene = this;
        var OnSubmit = function (result) {
            console.log(result);
            QuizResultModalPromise(scene, result)
                .then(function () {
                    // Test next question
                    if (!quiz.isLastQuestion) {
                        SetupQuizPanel(quizPanel, quiz.nextQuestion, OnSubmit);
                    } else {
                        console.log('Quiz complete')
                    }
                })
        }
        SetupQuizPanel(quizPanel, quiz.nextQuestion, OnSubmit);
    }

    update() { }
}

export default Quiz;