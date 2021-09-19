import UI from '../../../../plugins/ui-components.js'

const Sizer = UI.Sizer;
const GetValue = Phaser.Utils.Objects.GetValue;

class Bopomofo extends Sizer {
    constructor(scene, config) {
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
                { expand: true }
            )
            .add(
                tone
            )

    }
}

export default Bopomofo;