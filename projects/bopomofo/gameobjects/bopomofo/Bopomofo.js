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