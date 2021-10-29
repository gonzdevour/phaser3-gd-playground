import 'phaser';
import Base from './Base.js';
import { MainMenuSceneKey, QuizConfigSceneKey } from './Const.js';
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
        var mainMenu = CreateMainMenuPanel(this)
            .layout()
            .on('button.mode-select', function () {
                this.scene.start(QuizConfigSceneKey);
            }, this)
            .on('button.continue', function () {
                console.log('button.continue')
            })
            .on('button.config', function () {
                console.log('button.config')
            })
            .on('button.help', function () {
                console.log('button.help')
            })

        console.log(`${mainMenu.width}x${mainMenu.height}`)
    }

    update() { }
}

export default MainMenu;