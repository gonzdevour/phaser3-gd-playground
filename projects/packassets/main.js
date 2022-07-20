import 'phaser';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })
    }

    preload() {
        // All assets are loaded from this pack.json
        this.load.pack('pack', 'assets/pack.json');

        this.load.once('filecomplete-packfile-pack', function (key, type, data) {
            console.log('filecomplete-packfile-pack');

            // Pack.json is loaded, it's time to load assets
            this.load.on('progress', function (progress) {
                console.log(`progress...${progress * 100}%`);
            }, this);
        }, this)

        this.load.on('filecomplete', function (key, type, data) {
            console.log(`filecomplete-${type}-${key}`);
        })

        this.load.on('fileprogress', function (file, progress) {
            // console.log(`fileprogress...${progress * 100}% : ${file.key}`);
        });

    }

    create() {
        console.log(this.cache.json.get('pack'));

        LoadImageTesting(this);
        LoadTextTesting(this);
        LoadAudioTesting(this);
        LoadAtlasTesting(this);
        LoadSpriteSheetTesting(this);
        LoadBitmapFontTesting(this);
    }

    update() { }
}

var LoadImageTesting = function (scene) {
    scene.add.image(300, 300, 'bolt');
    scene.add.image(300, 400, 'add');
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

    scene.add.sprite(400, 300, 'knight').play('idle');
}

var LoadSpriteSheetTesting = function (scene) {
    var config = {
        key: 'explodeAnimation',
        frames: scene.anims.generateFrameNumbers('explosion', { start: 0, end: 23, first: 23 }),
        frameRate: 20,
        repeat: -1
    };

    scene.anims.create(config);

    scene.add.sprite(500, 300, 'explosion').play('explodeAnimation');
}

var LoadBitmapFontTesting = function (scene) {
    scene.add.bitmapText(600, 300, 'gothic', 'HELLO');
}



var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: Test
};

var game = new Phaser.Game(config);