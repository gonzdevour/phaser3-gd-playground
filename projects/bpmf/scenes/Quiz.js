import 'phaser';
import Base from './Base.js';
import { MainMenuSceneKey, QuizConfigSceneKey, QuizSceneKey, ResultSceneKey } from './Const.js';
import ModalDialogPromise from '../build/view/modeldialog/ModalDialogPromise.js';
import CreateQuizPanel from '../build/view/quizpanel/CreateQuizPanel.js';
import BuildQuiz from '../build/control/quiz/BuildQuiz.js';
import QuizPromise from '../build/control/quiz/QuizPromise.js';
import Clock from '../../../../phaser3-rex-notes/plugins/clock.js';
import zeropadedTimerString from '../../../plugins/utils/timer/zeropadedTimerString.js';

// Run quiz
class Quiz extends Base {
    constructor() {
        super({
            key: QuizSceneKey
        })

    }

    preload() {
    }

    create() {
        var _scene = this;
        super.scaleOuter(); //Base: this.rexScaleOuter.scale();

        //重置關卡紀錄。因為從lsData讀入的appData.record會影響BuildQuiz，所以這個步驟必須在BuidQuiz之前
        this.model.appData.load().reset();
        _scene.log(this.model.appData)

        //先建立Quiz面板
        var quizPanel = CreateQuizPanel(this, this.model.appData.loadQuizConfig());
        quizPanel
            .setMinSize(this.viewport.displayWidth, this.viewport.displayHeight)
            .layout()
        //_scene.log(`${quizPanel.width}x${quizPanel.height}`)

        //計時開始
        var quizClock = new Clock(this);
        quizClock
            .on('update', function(now, delta){ quizPanel.setTxtTimer(zeropadedTimerString(now) + '\n')})
            .start();
        _scene.log('quizClock start');

        //再建立Quiz題組
        var quiz = BuildQuiz(this.model);

        //組合Quiz面板與題組並啟動流程、偵測結束
        QuizPromise(quizPanel, quiz)
            .then(function () {
                _scene.model.appData.curTimeElapsed = Math.round(quizClock.now/1000);
                _scene.log('Quiz complete in ' + Math.round(quizClock.now/1000) + ' sec');
                //_scene.transitionTo( ResultSceneKey, 500 )
                _scene.scene.start(ResultSceneKey);
            })
        
        //返回上一頁按鈕
        var btnHome = CreateLabel(_scene, '返回', 'arrowL')
            .onClick( function (button, gameObject, pointer, event) {
                _scene.log('reqBack')
                ModalDialogPromise(_scene, {
                    //title: '使用說明',
                    content: '確定要返回選單頁面嗎？',
                    buttonMode: 2, //default:none|1:yes|2:yes&no
                    callbackYes: function(){ _scene.transitionTo( QuizConfigSceneKey, 500 ) },
        
                    width: _scene.viewport.displayWidth-50,
                })
            })

        super.create(); //createSysPanel & setupTransition
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