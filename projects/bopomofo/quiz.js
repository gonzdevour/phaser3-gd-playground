import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';
import CreateModel from './build/model/CreateModel.js';
import CreateQuizPanel from './build/quizpanel/CreateQuizPanel.js';
import SetupQuizPanel from './build/quiz/SetupQuizPanel.js';
import Question from './model/quiz/Question.js';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'quiz'
        })

    }

    preload() {
        // Load db file
        this.load.text('db0', 'assets/db0.compress');
        this.load.text('db1', 'assets/db1.compress');

        // Load sound file
        this.load.audio('ok', [
            'assets/sound/right.ogg',
            'assets/sound/right.m4a'
        ]);
        //Load image file
        this.load.image('confirm', 'assets/img/confirm.png');
        this.load.image('eraser', 'assets/img/eraser.png');
    }

    create() {
        var model = CreateModel({
            db: [
                this.cache.text.get('db0'),
                this.cache.text.get('db1'),
            ]
        })

        var gameConfig = this.game.config;
        var gameWindowWidth = gameConfig.width;
        var gameWindowHeight = gameConfig.height;
        var quizPanel = CreateQuizPanel(this)
            .setPosition(gameWindowWidth / 2, gameWindowHeight / 2)
            .setMinSize(gameWindowWidth, gameWindowHeight)
            .layout()

        console.log(`${quizPanel.width}x${quizPanel.height}`)

        var characters = model.db[0].characters.queryByBopomofo('ㄢㄣ');
        var character = Phaser.Utils.Array.GetRandom(characters);
        var question = new Question({
            title: '高頻詞600注音練習',
            character: character
        })

        SetupQuizPanel(quizPanel, question)
            .drawBounds(this.add.graphics(), 0xff0000)
            .on('complete', function (result) {
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