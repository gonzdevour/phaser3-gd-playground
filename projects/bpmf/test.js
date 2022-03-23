//env
import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';
import Base from './scenes/Base.js';

//to test
import ModalDialogPromise from './build/view/modeldialog/ModalDialogPromise.js';
import CreateReviewPanel from './build/view/resultpanel/CreateReviewPanel.js';

class Test extends Base {
    constructor() {
        super({
            key: 'test'
        })

    }

    preload() {
    }

    create() {
        var _scene = this;
        super.scaleOuter(); //Base: this.rexScaleOuter.scale();
        this.input.topOnly = false;

        var testArray = [
            {
                "word": "華生",
                "character": "華"
            },
            {
                "word": "公園",
                "character": "園"
            },
            {
                "word": "下棋",
                "character": "棋"
            },
            {
                "word": "勤勞",
                "character": "勞"
            },
            {
                "word": "民俗",
                "character": "俗"
            },
            {
                "word": "讀書",
                "character": "書"
            },
            {
                "word": "玩具",
                "character": "玩"
            },
            {
                "word": "恭喜",
                "character": "恭"
            },
            {
                "word": "忘記",
                "character": "忘"
            },
            {
                "word": "呼吸",
                "character": "呼"
            },
            {
                "word": "孫悟空",
                "character": "孫"
            }
        ]

        ModalDialogPromise(_scene, {
            title: '複習列表',
            content: CreateReviewPanel(_scene,{wrongList: testArray}),
            buttonMode: 1,        
            width: _scene.viewport.displayWidth-50,
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
        mode: Phaser.Scale.RESIZE, //scaleOuter plugin需要RESIZE mode
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: [Test]
};

var game = new Phaser.Game(config);