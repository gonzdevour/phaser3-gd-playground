import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';
import BuildFontTexture from './build/view/fonttexture/BuildFontTexture.js';
import { Initials, Media, Vowel, Tone } from './model/bopomofo/Bopomofo.js';
import { Style } from './build/view/style/style.js';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })

    }

    preload() {
    }

    create() {
        var styles = Style.quizPanel.choice;
        var key = BuildFontTexture(this, 'font0',
            [
                { characters: Initials, style: styles.phonology },
                { characters: Media, style: styles.phonology },
                { characters: Vowel, style: styles.phonology },
                { characters: Tone, style: styles.tone },
            ]
        );
        this.add.image(384, 667, key, '__BASE');
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