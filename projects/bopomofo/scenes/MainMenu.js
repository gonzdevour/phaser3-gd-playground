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
        var gameConfig = this.game.config;
        var gameWindowWidth = gameConfig.width;
        var gameWindowHeight = gameConfig.height;
        var mainMenu = CreateMainMenuPanel(this)
            .setPosition(gameWindowWidth / 2, gameWindowHeight / 2)
            .setMinSize(gameWindowWidth, gameWindowHeight)
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
    }

    update() { }
}

export default MainMenu;