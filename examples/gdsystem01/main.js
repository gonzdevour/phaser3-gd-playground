import 'phaser/src/phaser';
import AllPlugins from "./settings/AllPlugins.js";

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })
    }

    preload() {


    }

    create() {
        this.gd.add.textLabel(400, 200, 'ui', 'AABB').layout()

        this.add.text(600, 200, 'Restart')
            .setInteractive()
            .once('pointerup', function () {
                console.log('Test gd plugin restart')
                this.scene.restart()
            }, this)
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: Test,
    plugins: AllPlugins,
};

var game = new Phaser.Game(config);