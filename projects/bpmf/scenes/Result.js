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
        console.log('Lang=' + this.language);

        var _scene = this;
        super.scaleOuter(); //Base: this.rexScaleOuter.scale();

        //取得作答紀錄
        this.model.appData.load().reset();
        console.log(this.model.appData)

        //取得詞庫設定
        var quizConfig = this.model.getQuizConfig(); //從ls中取出紀錄並重建回QuizConfig
        switch (quizConfig.database) { //指定是哪一個題庫(每個題庫都已經prebuild好了)
            case '高頻詞庫':
                this.model.currentDB = this.model.db[0];
                break; 
            case '常用詞庫':
                this.model.currentDB = this.model.db[1];
                break;
        }

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
                console.log('button.help')
                ModalDialogPromise(_scene, {
                    title: '複習列表',
                    content: CreateReviewPanel(_scene,{wrongList: _scene.model.appData.record.wrongList}),
                    buttonMode: 1,        
                    width: _scene.viewport.width-50,
                })
            }, this)

        console.log(`${mainMenu.width}x${mainMenu.height}`)

        var logo = mainMenu.getElement('logo'); //從mainMenu取得logo物件
        this.rexUI.easeMoveFrom(logo, 1000, undefined, '-=200', 'Cubic'); //排好版之後再開始tween

        super.create(); //createSysPanel & setupTransition

    }

    update() { }
}

export default Result;