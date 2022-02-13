import 'phaser';
import Base from './Base.js';
import { MainMenuSceneKey, QuizConfigSceneKey, QuizSceneKey } from './Const.js';
import CreateMainMenuPanel from '../build/view/mainmenupanel/CreateMainMenuPanel.js';
import ModalDialogPromise from '../build/view/modeldialog/ModalDialogPromise.js';

// Main menu
class MainMenu extends Base {
    constructor() {
        super({
            key: MainMenuSceneKey
        })

    }

    preload() {
    }

    create() {
        var _scene = this;
        super.scaleOuter(); //Base: this.rexScaleOuter.scale();
        var mainMenu = CreateMainMenuPanel(this);
        mainMenu
            .setMinSize(this.viewport.displayWidth, this.viewport.displayHeight)
            .layout()
        //    .drawBounds(this.add.graphics(), 0xff0000)
        //on button clicked事件宣告在build/view/mainmenupanel/CreateMainMenuPanel.js
        //on button clicked後emit以下事件：
            .on('button.mode-select', function () { //模式選擇
                this.scene.transition({
                    target: QuizConfigSceneKey,
                    duration: 1000,
                });
            }, this)
            .on('button.continue', function () { //繼續遊戲
                this.scene.start(QuizSceneKey);
            }, this)
            .on('button.config', function () { //todo
                console.log('button.config')
            }, this)
            .on('button.help', function () { //todo
                console.log('button.help')
                ModalDialogPromise(_scene, {
                    title: '使用說明',
                    content: '高頻：參照教育部公布之詞頻總表\n常用：分類整理生活中的常見用詞',
                    buttonMode: 1,
        
                    width: _scene.viewport.width-50,
                })
            }, this)

        console.log(`${mainMenu.width}x${mainMenu.height}`)

        var logo = mainMenu.getElement('logo'); //從mainMenu取得logo物件
        this.rexUI.easeMoveFrom(logo, 1000, undefined, '-=200', 'Cubic'); //排好版之後再開始tween

        //super.create(); //create sysPanel

    }

    update() { }
}

export default MainMenu;