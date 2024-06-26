import UI from '../../../../plugins/ui-components.js';

//utils
import GetValue from '../../../../plugins/utils/object/GetValue.js';

const Sizer = UI.Sizer;

class Bopomofo extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        config.orientation = 'x';
        super(scene, config);
        scene.add.existing(this);

        var background = GetValue(config, 'background'); //config有background就設定background
        if (background) {
            this.addBackground(background);
        }

        var initials = GetValue(config, 'initials');  // Label, or text
        var media = GetValue(config, 'media');        // Label, or text
        var vowel = GetValue(config, 'vowel');        // Label, or text
        var tone = GetValue(config, 'tone');          // Label, or text
        var tone0 = GetValue(config, 'tone0');        // Label, or text
        var bopomofoSizer = new Sizer(scene, { //先排直的
            orientation: 'y',
            align: 'center'
        })
            .add(
                tone0,
                { proportion: 0, expand: false ,padding: {top:-20}}
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

        this //再排橫的
            .add(
                bopomofoSizer,
                { proportion: 0, expand: false }
            )
            .add(
                tone,
                { proportion: 0, expand: false }
            )

        this //建立索引，之後可以用getElement取回
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
        var txt = this.getElement('tone.text');

        // BBCodeText's new feature, to shift start position of text
        if ((text !== '') && txt.measureTextMargins) {
            txt.setXOffset(- txt.measureTextMargins(text).left);
        }

        txt.setText(text);
        return this;
    }

    setTone0(text) {
        var tone0 = this.getElement('tone0')
        SetText(tone0, text);
        //this.space.bottom = text==''?0:20;
        //this.layout();
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
        /*         
        this.getElement('initials.text').setColor(initials);
        this.getElement('media.text').setColor(media);
        this.getElement('vowel.text').setColor(vowel);
        this.getElement('tone.text').setColor(tone);
        this.getElement('tone0.text').setColor(tone0);
        */
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
        item.hide(); //不加入layout排版
    } else {
        item.show(); //加入layout排版
    }
}

export default Bopomofo;