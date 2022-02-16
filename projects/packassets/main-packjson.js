import 'phaser';
import PackJSON from './assets/pack.js';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })
    }

    preload() {
        this.load.pack('pack', PackJSON);

        this.load.once('filecomplete-packfile-pack', function (key, type, data) {
            console.log('filecomplete-packfile-pack');
        })

        this.load.on('filecomplete', function (key, type, data) {
            console.log(`filecomplete-${type}-${key}`);
        })

        this.load.on('progress', function (progress) {
            console.log(`progress...${progress * 100}%`);
        });

        this.load.on('fileprogress', function (file, progress) {
            console.log(`fileprogress...${progress * 100}% : ${file.key}`);
        });

    }

    create() {
        console.log(this.cache.json.get('pack'));

        LoadImageTesting(this);
        LoadTextTesting(this);
        LoadAudioTesting(this);
        LoadAtlasTesting(this);
    }

    update() { }
}

var LoadImageTesting = function (scene) {
    scene.add.image(300, 300, 'key');
    scene.add.image(400, 300, 'person');
    scene.add.image(500, 300, 'bolt');
}

var LoadTextTesting = function (scene) {
    console.log(scene.cache.text.get('csvArray'));
}

var LoadAudioTesting = function (scene) {
    scene.input.on('pointerdown', function () {
        scene.sound.play('right');
    }, this)
}

var LoadAtlasTesting = function (scene) {
    scene.anims.create({
        key: 'idle',
        frames: scene.anims.generateFrameNames('knight', { prefix: 'idle/frame', start: 0, end: 5, zeroPad: 4 }),
        frameRate: 8,
        repeat: -1
    });

    scene.add.sprite(400, 200, 'knight').play('idle');
}



var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: Test
};

var game = new Phaser.Game(config);