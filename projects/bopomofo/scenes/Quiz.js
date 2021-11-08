import 'phaser';
import Base from './Base.js';
import { QuizSceneKey } from './Const.js';
import CreateQuizPanel from '../build/quizpanel/CreateQuizPanel.js';
import BuildQuiz from '../build/quiz/BuildQuiz.js';
import QuizPromise from '../build/quiz/QuizPromose.js';

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
        super.create();
        var quizPanel = CreateQuizPanel(this).layout();

        console.log(`${quizPanel.width}x${quizPanel.height}`)

        var quiz = BuildQuiz(this.model);

        QuizPromise(quizPanel, quiz)
            .then(function () {
                console.log('Quiz complete');
            })
    }

    update() { }
}

export default Quiz;