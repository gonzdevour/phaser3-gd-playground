import UI from '../../../../plugins/ui-components.js';

const Sizer = UI.Sizer;
const GetValue = Phaser.Utils.Objects.GetValue;

class Panel extends Sizer {
    constructor(scene, config) {
        super(scene, config);
        scene.add.existing(this);

        var background = GetValue(config, 'background');
        if (background) {
            this.addBackground(background);
        }

        var word = GetValue(config, 'word');
        var choices = GetValue(config, 'choices');

        this
            .add(
                word,
                { proportion: 0, expand: false, align: 'center' }
            )
            .add(
                choices,
                { proportion: 1, expand: true }
            )


        this
            .addChildrenMap('word', word)
            .addChildrenMap('choices', choices)
    }

    setWord(data) {
        this.getElement('word').setWord(data);
        return this;
    }

    setChoicesText(data) {
        this.getElement('choices').setChoicesText(data);
        return this;
    }
}

export default Panel;