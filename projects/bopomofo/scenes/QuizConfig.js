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
        var quizConfigPanel = CreateQuizConfigPanel(this, {
            radio: quizConfig
        })
            .layout()
            // .drawBounds(this.add.graphics(), 0xff0000)
            .on('startQuiz', function (result) {
                console.log(result);
                Object.assign(quizConfig, result);
                this.scene.start(QuizSceneKey);
            }, this)

        console.log(`${quizConfigPanel.width}x${quizConfigPanel.height}`)
    }

    update() { }
}

export default QuizConfig;