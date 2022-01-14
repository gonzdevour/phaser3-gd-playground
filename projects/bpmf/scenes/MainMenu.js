import 'phaser';
import Base from './Base.js';
import { MainMenuSceneKey, QuizConfigSceneKey, QuizSceneKey } from './Const.js';
import CreateMainMenuPanel from '../build/view/mainmenupanel/CreateMainMenuPanel.js';

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
        super.create(); //Base: this.rexScaleOuter.scale();
        var mainMenu = CreateMainMenuPanel(this).layout()
        //on button clicked事件宣告在build/view/mainmenupanel/CreateMainMenuPanel.js
        //on button clicked後emit以下事件：
            .on('button.mode-select', function () { //模式選擇
                this.scene.start(QuizConfigSceneKey);
            }, this)
            .on('button.continue', function () { //繼續遊戲
                this.scene.start(QuizSceneKey);
            }, this)
            .on('button.config', function () { //todo
                console.log('button.config')
            }, this)
            .on('button.help', function () { //todo
                console.log('button.help')
            }, this)

        console.log(`${mainMenu.width}x${mainMenu.height}`)

        var logo = mainMenu.getElement('logo'); //從mainMenu取得logo物件
        this.rexUI.easeMoveFrom(logo, 1000, undefined, '-=200', 'Cubic'); //排好版之後再開始tween

    }

    update() { }
}

export default MainMenu;