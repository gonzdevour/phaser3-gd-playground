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
        var quizPanel = CreateQuizPanel(this).layout();

        console.log(`${quizPanel.width}x${quizPanel.height}`)

        var quiz = BuildQuiz(this.model);

        // Chain questions
        var Quiz = async function () {
            while(!quiz.isLastQuestion) {
                var result = await QuizPromise(quizPanel, quiz.nextQuestion);
                console.log(result);
                await QuizResultModalPromise(quizPanel.scene, result);    
            }
            console.log('Quiz complete');
        }
        Quiz();
    }

    update() { }
}

export default Quiz;