import 'phaser';
import Base from './Base.js';
import { QuizSceneKey } from './Const.js';
import CreateQuizPanel from '../build/quizpanel/CreateQuizPanel.js';
import BuildQuiz from '../build/quiz/BuildQuiz.js';
import QuizPromise from './build/quiz/QuizPromose.js';
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
        var Quiz = async function () {
            var result = await QuizPromise(quizPanel, quiz.nextQuestion);
            console.log(result);
            await QuizResultModalPromise(quizPanel.scene, result);

            // Test next question
            if (!quiz.isLastQuestion) {
                Quiz();
            } else {
                console.log('Quiz complete')
            }
        }
        Quiz();
    }

    update() { }
}

export default Quiz;