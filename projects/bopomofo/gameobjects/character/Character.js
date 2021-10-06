import UI from '../../../../plugins/ui-components.js';
import Bopomofo from '../bopomofo/Bopomofo.js';


const Sizer = UI.Sizer;
const GetValue = Phaser.Utils.Objects.GetValue;

class Character extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        config.orientation = 'x';
        super(scene, config);
        scene.add.existing(this);

        var background = GetValue(config, 'background');
        if (background) {
            this.addBackground(background);
        }

        var character = GetValue(config, 'character');
        var bopomofoConfig = GetValue(config, 'bopomofo');
        var bopomofo = new Bopomofo(scene, bopomofoConfig);
        this
            .add(character,
                { proportion: 0, expand: true }
            )
            .add(
                bopomofo,
                { proportion: 0, expand: true }
            )

        this
            .addChildrenMap('background', background)
            .addChildrenMap('character', character)
            .addChildrenMap('bopomofo', bopomofo)
    }

    setCharacter(text) {
        if (typeof (text) === 'string') {
            this.getElement('character').setText(text);
        } else {
            var config = text;
            this
                .setCharacter(GetValue(config, 'character', ''))
                .setBopomofo(config)
        }
        return this;
    }

    setBopomofo(config) {
        var tone = GetValue(config, 'tone', ''),
            tone0 = '';
        if (tone === '˙') {
            tone0 = tone;
            tone = ''
        }
        this
            .setInitials(GetValue(config, 'initials', ''))
            .setMedia(GetValue(config, 'media', ''))
            .setVowel(GetValue(config, 'vowel', ''))
            .setTone(tone)
            .setTone0(tone0)

        return this;
    }

    setBopomofoVisible(visible) {
        if (visible === undefined) {
            visible = true;
        }
        this.setChildVisible(this.getElement('bopomofo'), visible);
        return this;
    }

    setInitials(text) {
        this.getElement('bopomofo').setInitials(text);
        return this;
    }

    setMedia(text) {
        this.getElement('bopomofo').setMedia(text);
        return this;
    }

    setVowel(text) {
        this.getElement('bopomofo').setVowel(text);
        return this;
    }

    setTone(text) {
        this.getElement('bopomofo').setTone(text);
        return this;
    }

    setTone0(text) {
        this.getElement('bopomofo').setTone0(text);
        return this;
    }

    setCharacterColor(color) {
        this.getElement('character.text').setColor(color);
        this.getElement('bopomofo.initials.text').setColor(color);
        this.getElement('bopomofo.media.text').setColor(color);
        this.getElement('bopomofo.vowel.text').setColor(color);
        this.getElement('bopomofo.tone.text').setColor(color);
        this.getElement('bopomofo.tone0.text').setColor(color);
        return this;
    }
}

export default Character;