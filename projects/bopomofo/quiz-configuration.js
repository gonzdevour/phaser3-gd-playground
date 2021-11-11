import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';
import CreateQuizConfigPanel from './build/view/quizconfigpanel/CreateQuizConfigPanel.js';

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
        this.rexScaleOuter.scale();
        var quizConfigPanel = CreateQuizConfigPanel(this, {
            radio: { database: '常用詞庫', enhancement: '結合韻', mode: '測驗' }
        })
            .layout()
            // .drawBounds(this.add.graphics(), 0xff0000)
            .on('startQuiz', function (result) {
                console.log(result)
            })

        console.log(`${quizConfigPanel.width}x${quizConfigPanel.height}`)

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