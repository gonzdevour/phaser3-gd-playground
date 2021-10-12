import 'phaser';
import CreateQuizConfigurationPanel from '../build/quizconfigurationpanel/CreateQuizConfigurationPanel.js';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })

    }

    preload() {
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
            .drawBounds(this.add.graphics(), 0xff0000)
            .on('startQuiz', function (result) {
                console.log(result)
            })

    }

    update() { }
}

export default Test;