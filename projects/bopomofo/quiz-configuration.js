import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';
import CreateQuizConfigurationPanel from './build/quizconfigurationpanel/CreateQuizConfigurationPanel.js';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })

    }

    preload() {
        this.load.image('yes', 'assets/img/yes.png');
        this.load.image('no', 'assets/img/no.png');
    }

    create() {
        var gameConfig = this.game.config;
        var gameWindowWidth = gameConfig.width;
        var gameWindowHeight = gameConfig.height;
        CreateQuizConfigurationPanel(this, {
            radio: { database: '常用詞庫', enhancement: '結合韻', mode: '測驗' }
        })
            .setPosition(gameWindowWidth / 2, gameWindowHeight / 2)
            .setMinSize(gameWindowWidth, gameWindowHeight)
            .layout()
            // .drawBounds(this.add.graphics(), 0xff0000)
            .on('startQuiz', function (result) {
                console.log(result)
            })

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
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Test
};

var game = new Phaser.Game(config);