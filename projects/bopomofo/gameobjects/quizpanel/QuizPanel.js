import UI from '../../../../plugins/ui-components.js';

const Sizer = UI.Sizer;
const Buttons = UI.Buttons;
const GetValue = Phaser.Utils.Objects.GetValue;

class QuizPanel extends Sizer {
    constructor(scene, config) {
        super(scene, config);
        scene.add.existing(this);

        var background = GetValue(config, 'background');
        if (background) {
            this.addBackground(background);
        }

        var title = GetValue(config, 'title');
        if (title) {
            var spaceTitle = GetValue(config, 'space.title', 0);
            this.add(
                title,
                {
                    proportion: 1, expand: true,
                    padding: { bottom: spaceTitle }
                }
            )
        }

        var word = GetValue(config, 'word');
        var spaceWord = GetValue(config, 'space.word', 0);

        var choices = GetValue(config, 'choices');
        var spaceChoices = GetValue(config, 'space.choices', 0);

        this
            .addChildrenMap('background', background)
            .add(
                word,
                {
                    proportion: 0, expand: false, align: 'center',
                    padding: { bottom: spaceWord }
                }
            )
            .add(
                choices,
                {
                    proportion: 1, expand: true,
                    padding: { bottom: spaceChoices }
                }
            )

        var actions = GetValue(config, 'actions');
        var spaceAction = GetValue(config, 'space.action', 0);
        var spaceActionItem = GetValue(config, 'space.actionItem', 0);
        if (actions) {
            var actionsSizer = new Buttons(scene, {
                orientation: 'x',
                buttons: actions,
                eventEmitter: this,
                space: { item: spaceActionItem }
            })
            this.add(
                actionsSizer,
                {
                    proportion: 0, align: 'right',
                    padding: { bottom: spaceAction }
                }
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

    getCharacter(index) {
        return this.getElement('word').getCharacter(index);
    }

    setChoicesText(data) {
        this.getElement('choices').setChoicesText(data);
        return this;
    }

    getChoiceResult() {
        return this.getElement('choices').getChoiceResult();
    }
}

export default QuizPanel;