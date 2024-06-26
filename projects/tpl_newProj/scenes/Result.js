import 'phaser';
import Base from './Base.js';
import * as SceneKey from '../settings/SceneKey.js';
import CreateResultPanel from '../build/view/resultpanel/CreateResultPanel.js';
import CreateReviewPanel from '../build/view/resultpanel/CreateReviewPanel.js';
import { DialogY } from '../build/view/modaldialog/DialogType.js';

// Result
class Result extends Base {
    constructor() {
        super({
            key: SceneKey.Result
        })

    }

    preload() {
    }

    create() {
        var _scene = this;
        super.scaleOuter(); //Base: this.rexScaleOuter.scale();

        _scene.input.topOnly = false;
        var quizConfig = _scene.model.appData.loadQuizConfig(); //從ls中取得QuizConfig的設定(詞庫|強化|模式)
        _scene.model.setCurrentDB(quizConfig);//依QuizConfig設定currentDB

        var mainMenu = CreateResultPanel(this);
        mainMenu
            .setMinSize(this.viewport.displayWidth, this.viewport.displayHeight)
            .layout()
        //    .drawBounds(this.add.graphics(), 0xff0000)
        //on button clicked事件宣告在build/view/mainmenupanel/CreateMainMenuPanel.js
        //on button clicked後emit以下事件：
            .on('button.retry', function () { //繼續遊戲
                this.transitionTo(SceneKey.Game, 500);
            }, this)
            .on('button.back', function () { //模式選擇
                this.transitionTo( SceneKey.Menu,500 );
            }, this)
            .on('button.review', function () { //開啟review modalPromise
                _scene.game.api.sound.play(_scene, 'right');
                _scene.log('button.help')
                DialogY(_scene, {
                    title: '複習列表',
                    content: CreateReviewPanel(_scene,{wrongList: _scene.model.appData.record.wrongList}),
                    extraConfig: {expand: {title: false, content: true}}
                })
            }, this)

        //this.log(`${mainMenu.width}x${mainMenu.height}`)

        super.create(); //createSysPanel & setupTransition

    }

    update() { }
}

export default Result;