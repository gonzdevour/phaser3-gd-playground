import UI from '../../../../plugins/ui-components.js';
import Bopomofo from '../bopomofo/Bopomofo.js';


const Sizer = UI.Sizer;
const GetValue = Phaser.Utils.Objects.GetValue;

class Character extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var background = GetValue(config, 'background');
        var character = GetValue(config, 'character');
        var bopomofoConfig = GetValue(config, 'bopomofo');
        var bopomofo = new Bopomofo(scene, bopomofoConfig);

        config.orientation = 'x';
        super(scene, config);

        if (background) {
            this.addBackground(background);
        }

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
        this.getElement('character').setText(text);
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