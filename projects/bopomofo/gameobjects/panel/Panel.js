import UI from '../../../../plugins/ui-components.js';

const Sizer = UI.Sizer;
const Buttons = UI.Buttons;
const GetValue = Phaser.Utils.Objects.GetValue;

class Panel extends Sizer {
    constructor(scene, config) {
        super(scene, config);
        scene.add.existing(this);

        var background = GetValue(config, 'background');
        if (background) {
            this.addBackground(background);
        }

        var title = GetValue(config, 'title');
        if (title) {
            this.add(
                title,
                { proportion: 1, expand: true }
            )
        }

        var word = GetValue(config, 'word');
        var choices = GetValue(config, 'choices');

        this
            .addChildrenMap('background', background)
            .add(
                word,
                { proportion: 0, expand: false, align: 'center' }
            )
            .add(
                choices,
                { proportion: 1, expand: true }
            )

        var actions = GetValue(config, 'actions');
        if (actions) {
            var actionsSizer = new Buttons(scene, {
                orientation: 'x',
                buttons: actions,
                eventEmitter: this,
            })
            this.add(
                actionsSizer,
                { proportion: 0, align: 'right' }
            )
        }


        this
            .addChildrenMap('title', title)
            .addChildrenMap('word', word)
            .addChildrenMap('choices', choices)
            .addChildrenMap('actions', actions)
    }

    setTitle(data) {
        this.getElement('title').setText(data);
        return this;
    }

    setWord(data) {
        this.getElement('word').setWord(data);
        return this;
    }

    setChoicesText(data) {
        this.getElement('choices').setChoicesText(data);
        return this;
    }

    getChoiceResult() {
        return this.getElement('choices').getChoiceResult();
    }
}

export default Panel;