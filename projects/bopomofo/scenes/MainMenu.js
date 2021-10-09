import 'phaser';
import CreateMainMenuPanel from '../build/mainmenupanel/CreateMainMenuPanel.js';
import EaseMoveFrom from '../../../../phaser3-rex-notes/plugins/behaviors/easemove/EaseMoveFrom.js';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'main-menu'
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
                console.log('button.mode-select')
            })
            .on('button.continue', function () {
                console.log('button.continue')
            })
            .on('button.config', function () {
                console.log('button.config')
            })
            .on('button.help', function () {
                console.log('button.help')
            })

        var logo = mainMenu.getElement('logo');
        EaseMoveFrom(logo, 1000, undefined, '-=200', 'Cubic');
    }

    update() { }
}

export default Test;