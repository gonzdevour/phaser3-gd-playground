import 'phaser';
import Base from './Base.js';
import { MainMenuSceneKey, QuizConfigSceneKey, QuizSceneKey, ResultSceneKey } from './Const.js';
import CreateResultPanel from '../build/view/resultpanel/CreateResultPanel.js';
import CreateReviewPanel from '../build/view/resultpanel/CreateReviewPanel.js';
import ModalDialogPromise from '../build/view/modeldialog/ModalDialogPromise.js';

// Result
class Result extends Base {
    constructor() {
        super({
            key: ResultSceneKey
        })

    }

    preload() {
    }

    create() {
        var _scene = this;
        super.scaleOuter(); //Base: this.rexScaleOuter.scale();

        _scene.log('Lang=' + this.language);

        _scene.input.topOnly = false;

        _scene.model.getQuizConfig(); //從ls中取得QuizConfig的設定(詞庫|強化|模式)，並設定currentDB
        _scene.model.appData.load(); //從ls中取得appData

        var mainMenu = CreateResultPanel(this);
        mainMenu
            .setMinSize(this.viewport.displayWidth, this.viewport.displayHeight)
            .layout()
        //    .drawBounds(this.add.graphics(), 0xff0000)
        //on button clicked事件宣告在build/view/mainmenupanel/CreateMainMenuPanel.js
        //on button clicked後emit以下事件：
            .on('button.retry', function () { //繼續遊戲
                this.transitionTo(QuizSceneKey, 500);
            }, this)
            .on('button.back', function () { //模式選擇
                this.transitionTo( QuizConfigSceneKey,500 );
            }, this)
            .on('button.review', function () { //開啟review modalPromise
                _scene.sound.play('right');
                _scene.log('button.help')
                ModalDialogPromise(_scene, {
                    title: '複習列表',
                    content: CreateReviewPanel(_scene,{wrongList: _scene.model.appData.record.wrongList}),
                    buttonMode: 1,        
                    width: _scene.viewport.displayWidth-50,
                })
            }, this)

        //this.log(`${mainMenu.width}x${mainMenu.height}`)

        super.create(); //createSysPanel & setupTransition

    }

    update() { }
}

export default Result;