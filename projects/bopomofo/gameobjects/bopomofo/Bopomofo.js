import UI from '../../../../plugins/ui-components.js';

const Sizer = UI.Sizer;
const GetValue = Phaser.Utils.Objects.GetValue;

class Bopomofo extends Sizer {
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

        var initials = GetValue(config, 'initials');  // Label, or text
        var media = GetValue(config, 'media');        // Label, or text
        var vowel = GetValue(config, 'vowel');        // Label, or text
        var tone = GetValue(config, 'tone');          // Label, or text
        var tone0 = GetValue(config, 'tone0');        // Label, or text
        var bopomofoSizer = new Sizer(scene, {
            orientation: 'y',
            align: 'center'
        })
            .add(
                tone0,
                { proportion: 0, expand: false }
            )
            .add(
                initials,
                { proportion: 0, expand: false }
            )
            .add(
                media,
                { proportion: 0, expand: false }
            )
            .add(
                vowel,
                { proportion: 0, expand: false }
            )

        this
            .add(
                bopomofoSizer,
                { proportion: 0, expand: false }
            )
            .add(
                tone,
                { proportion: 0, expand: false }
            )

        this
            .addChildrenMap('background', background)
            .addChildrenMap('initials', initials)
            .addChildrenMap('media', media)
            .addChildrenMap('vowel', vowel)
            .addChildrenMap('tone', tone)
            .addChildrenMap('tone0', tone0)
    }

    setInitials(text) {
        SetText(this.getElement('initials'), text);
        return this;
    }

    setMedia(text) {
        SetText(this.getElement('media'), text);
        return this;
    }

    setVowel(text) {
        SetText(this.getElement('vowel'), text);
        return this;
    }

    setTone(text) {
        this.getElement('tone').setText(text);
        return this;
    }

    setTone0(text) {
        SetText(this.getElement('tone0'), text);
        return this;
    }

    setBopomofoColor(initials, media, vowel, tone, tone0) {
        if (media === undefined) {
            media = initials;
        }
        if (vowel === undefined) {
            vowel = initials;
        }
        if (tone === undefined) {
            tone = initials;
        }
        if (tone0 === undefined) {
            tone0 = initials;
        }
        this.getElement('initials.text').setColor(initials);
        this.getElement('media.text').setColor(media);
        this.getElement('vowel.text').setColor(vowel);
        this.getElement('tone.text').setColor(tone);
        this.getElement('tone0.text').setColor(tone0);
        return this;
    }
}

var SetText = function (item, text) {
    item.setText(text);
    if ((!text) || (text === '')) {
        item.hide();
    } else {
        item.show();
    }
}

export default Bopomofo;