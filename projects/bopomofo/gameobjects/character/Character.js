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
                { proportion: 1, expand: true }
            )
            .add(
                bopomofo,
                { proportion: 0, expand: true }
            )

        this
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
                .setInitials(GetValue(config, 'initials', ''))
                .setMedia(GetValue(config, 'media', ''))
                .setVowel(GetValue(config, 'vowel', ''))
                .setTone(GetValue(config, 'tone', ''))
        }
        return this;
    }

    setInitials(text) {
        this.getElement('bopomofo.initials').setText(text);
        return this;
    }

    setMedia(text) {
        this.getElement('bopomofo.media').setText(text);
        return this;
    }

    setVowel(text) {
        this.getElement('bopomofo.vowel').setText(text);
        return this;
    }

    setTone(text) {
        this.getElement('bopomofo.tone').setText(text);
        return this;
    }
}

export default Character;