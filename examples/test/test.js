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

        this.add.image(400, 300, 'search')
    }

    update() { }
}


var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: Test
};

var game = new Phaser.Game(config);