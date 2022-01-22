import 'phaser';
import Base from './Base.js';
import { QuizSceneKey } from './Const.js';
import CreateQuizPanel from '../build/view/quizpanel/CreateQuizPanel.js';
import BuildQuiz from '../build/control/quiz/BuildQuiz.js';
import QuizPromise from '../build/control/quiz/QuizPromise.js';

// Run quiz
class Quiz extends Base {
    constructor() {
        super({
            key: QuizSceneKey
        })

    }

    preload() {
/*         // Load sound file
        this.load.audio('ok', [
            'assets/sound/right.ogg',
            'assets/sound/right.m4a'
        ]);
        //Load image file
        this.load.image('confirm', 'assets/img/confirm.png');
        this.load.image('eraser', 'assets/img/eraser.png');

        // Test-pass dialog
        this.load.image('yes', 'assets/img/yes.png'); */
    }

    create() {
        super.create(); //Base: this.rexScaleOuter.scale();
        var quizPanel = CreateQuizPanel(this, this.model.getQuizConfig());
        quizPanel
            .setMinSize(this.viewport.displayWidth, this.viewport.displayHeight)
            .layout(); //先建立Quiz面板

        console.log(`${quizPanel.width}x${quizPanel.height}`)

        var quiz = BuildQuiz(this.model); //再建立Quiz題組

        QuizPromise(quizPanel, quiz) //組合Quiz面板與題組並啟動流程、偵測結束
            .then(function () {
                console.log('Quiz complete');
            })
    }

    update() { }
}

export default Quiz;