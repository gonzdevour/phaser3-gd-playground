import 'phaser';
import Base from './Base.js';
import { MainMenuSceneKey, QuizConfigSceneKey, QuizSceneKey } from './Const.js';
import CreateMainMenuPanel from '../build/mainmenupanel/CreateMainMenuPanel.js';

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
        super.create();
        var mainMenu = CreateMainMenuPanel(this).layout()
            .on('button.mode-select', function () {
                this.scene.start(QuizConfigSceneKey);
            }, this)
            .on('button.continue', function () {
                this.scene.start(QuizSceneKey);
            }, this)
            .on('button.config', function () {
                console.log('button.config')
            }, this)
            .on('button.help', function () {
                console.log('button.help')
            }, this)

        console.log(`${mainMenu.width}x${mainMenu.height}`)
    }

    update() { }
}

export default MainMenu;