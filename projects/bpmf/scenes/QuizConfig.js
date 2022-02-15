import 'phaser';
import Base from './Base.js';
import { MainMenuSceneKey, QuizConfigSceneKey, QuizSceneKey } from './Const.js';
import ModalDialogPromise from '../build/view/modeldialog/ModalDialogPromise.js';
import CreateQuizConfigPanel from '../build/view/quizconfigpanel/CreateQuizConfigPanel.js';

// Setup quiz
class QuizConfig extends Base {
    constructor() {
        super({
            key: QuizConfigSceneKey
        })

    }

    preload() {
    }

    create() {
        super.scaleOuter();//Base: this.rexScaleOuter.scale();

        var quizConfigPanel = CreateQuizConfigPanel(this, {
            radio: this.model.getQuizConfig()
        })
            .setMinSize(this.viewport.displayWidth, this.viewport.displayHeight)
            .layout()
             .drawBounds(this.add.graphics(), 0xff0000)
            .on('startQuiz', function (result) {
                console.log(result);
                this.model.setQuizConfig(result);
                this.transitionTo(QuizSceneKey,500 );
            }, this)

        console.log(`${quizConfigPanel.width}x${quizConfigPanel.height}`)

        super.create(); //createSysPanel & setupTransition
        var _scene = this;
        //返回上一頁
        var btnHome = CreateLabel(_scene, '返回', 'arrowL')
            .onClick( function (button, gameObject, pointer, event) {
                _scene.transitionTo(MainMenuSceneKey,500);
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

export default QuizConfig;