import 'phaser';
import Base from './Base.js';
import { QuizConfigSceneKey, QuizSceneKey } from './Const.js';
import CreateQuizConfigurationPanel from '../build/quizconfigurationpanel/CreateQuizConfigurationPanel.js';

// Setup quiz
class QuizConfig extends Base {
    constructor() {
        super({
            key: QuizConfigSceneKey
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
                this.scene.start(QuizSceneKey);
            }, this)
    }

    update() { }
}

export default QuizConfig;