import 'phaser';
import Base from './Base.js';
import * as SceneKey from '../settings/SceneKey.js';
import ModalDialogPromise from '../build/view/modaldialog/ModalDialogPromise.js';
import CreateQuizConfigPanel from '../build/view/quizconfigpanel/CreateQuizConfigPanel.js';

// Setup quiz
class Menu extends Base {
    constructor() {
        super({
            key: SceneKey.Menu
        })

    }

    preload() {
    }

    create() {
        super.scaleOuter();//Base: this.rexScaleOuter.scale();

        var quizConfigPanel = CreateQuizConfigPanel(this, {
            radio: this.model.appData.loadQuizConfig()
        })
            .setMinSize(this.viewport.displayWidth, this.viewport.displayHeight)
            .layout()
            .on('startQuiz', function (result) {
                this.log(result);
                this.model.appData.save(result);
                this.transitionTo(SceneKey.Game,500 );
            }, this)

        this.drawBounds(quizConfigPanel);
        //console.log(`${quizConfigPanel.width}x${quizConfigPanel.height}`);

        super.create(); //createSysPanel & setupTransition
        var _scene = this;
        //返回上一頁
        var btnHome = CreateLabel(_scene, '返回', 'arrowL')
            .onClick( function (button, gameObject, pointer, event) {
                _scene.transitionTo(SceneKey.Home,500);
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

export default Menu;