import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';
import CreateMainMenuPanel from './build/view/mainmenupanel/CreateMainMenuPanel.js';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'main-menu'
        })

    }

    preload() {
    }

    create() {
        var mainMenu = CreateMainMenuPanel(this)
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
        this.rexUI.easeMoveFrom(logo, 1000, undefined, '-=200', 'Cubic');
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 768,
    height: 1334,
    scale: {
        // mode: Phaser.Scale.ENVELOP,
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Test
};

var game = new Phaser.Game(config);