import 'phaser';
import Base from './Base.js';
import { MainMenuSceneKey, QuizConfigSceneKey, QuizSceneKey, ResultSceneKey } from './Const.js';
import ModalDialogPromise from '../build/view/modeldialog/ModalDialogPromise.js';
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
        var _scene = this;
        super.scaleOuter(); //Base: this.rexScaleOuter.scale();

        var quizPanel = CreateQuizPanel(this, this.model.getQuizConfig());
        quizPanel
            .setMinSize(this.viewport.displayWidth, this.viewport.displayHeight)
            .layout() //先建立Quiz面板

        //console.log(`${quizPanel.width}x${quizPanel.height}`)

        var quiz = BuildQuiz(this.model); //再建立Quiz題組

        super.create(); //createSysPanel & setupTransition
        QuizPromise(quizPanel, quiz) //組合Quiz面板與題組並啟動流程、偵測結束
            .then(function () {
                console.log('Quiz complete');
                //_scene.transitionTo( ResultSceneKey, 500 )
                _scene.scene.start(ResultSceneKey);
            })
        
        //返回上一頁
        var btnHome = CreateLabel(_scene, '返回', 'arrowL')
            .onClick( function (button, gameObject, pointer, event) {
                console.log('reqBack')
                ModalDialogPromise(_scene, {
                    //title: '使用說明',
                    content: '確定要返回選單頁面嗎？',
                    buttonMode: 2, //default:none|1:yes|2:yes&no
                    callbackYes: function(){ _scene.transitionTo( QuizConfigSceneKey, 500 ) },
        
                    width: _scene.viewport.width-50,
                })
            })
        this.sysPanel
            .add(btnHome,{ align: 'left-top', expand: false, key:'btnHome' })
            .layout()

    }

    update() { }
}

var CreateLabel = function (scene, text, img ) {
    return scene.rexUI.add.label({
        //background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
        icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
        //text: scene.rexUI.add.BBCodeText(0, 0, text, Style.quizPanel.action.submit),
        //space: { left: 0, right: 0, top: 10, bottom: 10, icon: 0 }
    });
}

export default Quiz;