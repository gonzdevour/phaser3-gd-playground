import UI from '../../../../plugins/ui-components.js';

const Sizer = UI.Sizer;
const Buttons = UI.Buttons;
const OverlapSizer = UI.OverlapSizer;
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
                    proportion: 0, expand: true,
                    padding: { bottom: spaceTitle }
                }
            )
        }

        var wordBlock = new OverlapSizer(scene);
        var word = GetValue(config, 'word');
        var spaceWord = GetValue(config, 'space.word', 0);
        wordBlock.add(word, {
            key: 'word',
            align: 'center',
            expand: false,
            padding: { bottom: spaceWord }
        })

        var choices = GetValue(config, 'choices');
        var spaceChoices = GetValue(config, 'space.choices', 0);

        this
            .add(
                wordBlock,
                {
                    proportion: 0, expand: true, align: 'center'
                }
            )
            .add(
                choices,
                {
                    proportion: 1, expand: true,
                    padding: { bottom: spaceChoices }
                }
            )

        var footer = GetValue(config, 'footer');
        if (footer) {
            var expand = GetValue(config, 'expand.footer', false);
            this.add(
                footer,
                {
                    proportion: 0,
                    align: (expand) ? 'left' : 'right',
                    expand: expand,
                }
            )
        }

        this
            .addChildrenMap('background', background)
            .addChildrenMap('title', title)
            .addChildrenMap('word', word)
            .addChildrenMap('wordBlock', wordBlock)
            .addChildrenMap('choices', choices)
            .addChildrenMap('footer', footer)
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

    clearCharacterBopomofo(index) {
        this.getElement('word').clearCharacterBopomofo(index);
        return this;
    }

    setCharacterBopomofo(index, config) {
        this.getElement('word').setCharacterBopomofo(index, config);
        return this;
    }

    layoutCharacter(index) {
        this.getElement('word.characters')[index].layout();
        return this;
    }

    setChoicesText(data) {
        this.getElement('choices').setChoicesText(data);
        return this;
    }

    clearChoices() {
        this.getElement('choices').clearChoices();
        return this;
    }

    getChoiceResult(out) {
        return this.getElement('choices').getChoiceResult(out);
    }

    setWordColor(color) {
        this.getElement('word').setWordColor(color);
        return this;
    }

    setCharacterColor(index, color) {
        this.getElement('word').setCharacterColor(index, color);
        return this;
    }

    addToWordBlock(gameObject, config) {
        // Add gameObject to wordBlock, an OverlapSizer
        this.getElement('wordBlock').add(gameObject, config);
        return this;
    }
}

export default QuizPanel;