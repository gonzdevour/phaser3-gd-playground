import 'phaser';
import Base from './Base.js';
import { QuizConfigSceneKey, QuizSceneKey } from './Const.js';
import CreateQuizConfigPanel from '../build/quizconfigpanel/CreateQuizConfigPanel.js';

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
        var quizConfig = this.model.quizConfig;

        var gameConfig = this.game.config;
        var gameWindowWidth = gameConfig.width;
        var gameWindowHeight = gameConfig.height;
        CreateQuizConfigPanel(this, {
            radio: quizConfig
        })
            .setPosition(gameWindowWidth / 2, gameWindowHeight / 2)
            .setMinSize(gameWindowWidth, gameWindowHeight)
            .layout()
            // .drawBounds(this.add.graphics(), 0xff0000)
            .on('startQuiz', function (result) {
                console.log(result);
                Object.assign(quizConfig, result);
                this.scene.start(QuizSceneKey);
            }, this)
    }

    update() { }
}

export default QuizConfig;