/*
var bopomofo = new Bopomofo(scene, {
    x: 400, y: 300,           // Position
    width: 100, height: 120,  // Minimun size

    // background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),

    // Use getLabelCallback if initials, media, vowel, tone parameter is not given
    getLabelCallback: GetLabel,  
    
    // Assign element individually
    // initials: GetLabel(scene, 'ㄑ'),
    // media: GetLabel(scene, 'ㄧ'),
    // vowel: GetLabel(scene, 'ㄢ'),
    // tone: GetLabel(scene, 'ˊ'),
});

var GetLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
        text: scene.rexUI.add.BBCodeText(0, 0, text,
            { fontSize: 20, fixedWidth: 24, fixedHeight: 24, halign: 'center', valign: 'center' }
        ),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'center',
        space: { left: 10, right: 10, top: 10, bottom: 10 }
    })
}
*/

import UI from '../../../../plugins/ui-components.js';

const Sizer = UI.Sizer;
const GetValue = Phaser.Utils.Objects.GetValue;

class Bopomofo extends Sizer {
    constructor(scene, config) {
        var background = GetValue(config, 'background');
        var getLabel = GetValue(config, 'getLabelCallback');
        var initials = GetValue(config, 'initials');  // Label, or text
        var media = GetValue(config, 'media');        // Label, or text
        var vowel = GetValue(config, 'vowel');        // Label, or text
        var tone = GetValue(config, 'tone');          // Label, or text

        if (initials == undefined) {
            initials = getLabel(scene);
        }

        if (media == undefined) {
            media = getLabel(scene);
        }

        if (vowel == undefined) {
            vowel = getLabel(scene);
        }

        if (tone == undefined) {
            tone = getLabel(scene);
        }

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