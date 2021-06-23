import 'phaser';
import IMA from '../../../plugins/ima/IMA.js';


const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'game1'
        })

    }

    preload() {
        this.load.image('classroom', 'assets/classroom.png');
        this.load.image('bg_label', 'assets/long-small.png');
        this.load.image('char_catgirl', 'assets/char_catgirl.png');
    }

    create() {
        var ima = new IMA({
            adTag: 'https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_text_image&client=ca-games-pub-7380101976321108&description_url=http%3A%2F%2Fsales-frontier.com&videoad_start_delay=0&hl=zh_TW&max_ad_duration=30000&vad_type=nonlinear&adtest=on'
        });

        // Example of creating sprite/image
        this.add.image(308, 667, 'classroom');
        //this.add.image(308, 667, 'bg_label');
        this.add.image(308, 200, 'char_catgirl');

        var buttons = this.rexUI.add.buttons({
            anchor: {
                centerX: 'center',
                centerY: 'center'
            },

            orientation: 'x',
            space: 20,

            buttons: [
                createButton(this, 'PLAY'),
                createButton(this, 'GOTO'),
            ],

        })
            .setOrigin(0.5, 0.5)
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000)

        buttons
            .on('button.click', function (button, index, pointer, event) {
                console.log(`Click button-${button.text}` + index);
                if (index == 0) {
                    console.log(index + ' has been clicked!');
                    ima.play();
                } else if (index == 1) {
                    console.log(index + ' has been clicked!');
                    this.scene.start('game2');
                } else {
                    console.log('else has been clicked!');
                }
            }, this)
    }

    update() { }
}

var createButton = function (scene, text) {
    return scene.rexUI.add.label({
        width: 200,
        height: 60,
        background: create9p(scene, 100, 100, 200, 50, 'bg_label', 20, 20),
        text: scene.add.text(0, 0, text, {
            fontSize: 24,
            color: '#000'
        }),
        icon: scene.add.image(308, 667, 'char_catgirl').setScale(0.5),
        iconMask: true,
        space: {
            left: 5,
            right: 5,
            top: 0,
            bottom: 5,
        }
    });
}

var create9p = function (scene, r9px, r9py, r9pw, r9ph, r9pKey, r9pEdgeWidth, r9pEdgeHeight) {
    return scene.rexUI.add.ninePatch({
        x: r9px,
        y: r9py,
        width: r9pw,
        height: r9ph,
        key: r9pKey,
        columns: [r9pEdgeWidth, undefined, r9pEdgeWidth],
        rows: [r9pEdgeHeight, undefined, r9pEdgeHeight],
    })
}

export default Game;