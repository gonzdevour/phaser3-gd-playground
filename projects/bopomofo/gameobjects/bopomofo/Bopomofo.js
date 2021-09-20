import UI from '../../../../plugins/ui-components.js';

const Sizer = UI.Sizer;
const GetValue = Phaser.Utils.Objects.GetValue;

class Bopomofo extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var background = GetValue(config, 'background');
        var initials = GetValue(config, 'initials');  // Label, or text
        var media = GetValue(config, 'media');        // Label, or text
        var vowel = GetValue(config, 'vowel');        // Label, or text
        var tone = GetValue(config, 'tone');          // Label, or text

        config.orientation = 'x';
        super(scene, config);
        scene.add.existing(this);

        if (background) {
            this.addBackground(background);
        }

        var bopomofoSizer = new Sizer(scene, {
            orientation: 'y'
        })
            .add(
                initials,
                { proportion: 1, expand: true }
            )
            .add(
                media,
                { proportion: 1, expand: true }
            )
            .add(
                vowel,
                { proportion: 1, expand: true }
            )

        this
            .add(
                bopomofoSizer,
                { proportion: 0, expand: true }
            )
            .add(
                tone,
                { proportion: 0 }
            )

        this
            .addChildrenMap('initials', initials)
            .addChildrenMap('media', media)
            .addChildrenMap('vowel', vowel)
            .addChildrenMap('tone', tone)
    }

    setInitials(text) {
        this.getElement('initials').setText(text);
        return this;
    }

    setMedia(text) {
        this.getElement('media').setText(text);
        return this;
    }

    setVowel(text) {
        this.getElement('vowel').setText(text);
        return this;
    }

    setTone(text) {
        this.getElement('tone').setText(text);
        return this;
    }
}

export default Bopomofo;