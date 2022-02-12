import 'phaser';
import Base from './Base.js';
import { MainMenuSceneKey, QuizConfigSceneKey, QuizSceneKey } from './Const.js';
import CreateQuizPanel from '../build/view/quizpanel/CreateQuizPanel.js';
import BuildQuiz from '../build/control/quiz/BuildQuiz.js';
import QuizPromise from '../build/control/quiz/QuizPromise.js';
import ModalDialogPromise from '../build/view/modeldialog/ModalDialogPromise.js';
import CreateSysPanel from "../build/view/syspanel/CreateSysPanel.js";

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
            .layout() //先建立Quiz面板

        //console.log(`${quizPanel.width}x${quizPanel.height}`)

        var quiz = BuildQuiz(this.model); //再建立Quiz題組

        QuizPromise(quizPanel, quiz) //組合Quiz面板與題組並啟動流程、偵測結束
            .then(function () {
                console.log('Quiz complete');
            })

        var _scene = this;

        var sysPanel = CreateSysPanel(_scene)
            .setPosition(_scene.viewport.centerX, _scene.viewport.centerY)
            .setMinSize(_scene.viewport.displayWidth, _scene.viewport.displayHeight)
            .layout()

        //返回上一頁
        var btnHome = sysPanel.getElement('btnHome');
        btnHome
            .on('reqBack', function () {
                console.log('reqBack')
                ModalDialogPromise(_scene, {
                    //title: '使用說明',
                    content: '確定要返回選單畫面嗎？',
                    buttonMode: 2, //default:none|1:yes|2:yes&no
                    callbackYes: function(){ _scene.scene.start(QuizConfigSceneKey) },
        
                    width: _scene.viewport.width-50,
                })
            }, this)
    }

    update() { }
}

export default Quiz;