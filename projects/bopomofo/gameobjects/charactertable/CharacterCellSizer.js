import UI from '../../../../plugins/ui-components.js';

const Sizer = UI.Sizer;
const GetValue = Phaser.Utils.Objects.GetValue;

class CharacterCellSizer extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        config.orientation = 'x';
        super(scene, config);
        scene.add.existing(this);

        var background;
        var backgroundCallback = GetValue(config, 'background');
        if (backgroundCallback) {
            background = backgroundCallback(scene);
            this.addBackground(background);
        }

        var characterCallback = GetValue(config, 'character');
        var character = characterCallback(scene);
        this.add(character,
            { proportion: 0, expand: false }
        )

        var words = [];
        var wordCount = GetValue(config, 'maxWordCount', 2);
        var wordCallback = GetValue(config, 'word');
        for (var i = 0; i < wordCount; i++) {
            var word = wordCallback(scene);
            this.add(word,
                { proportion: 0, expand: false }
            )
            words.push(word);
        }

        this
            .addChildrenMap('background', background)
            .addChildrenMap('character', character)
            .addChildrenMap('words', words)

    }

    showCharacter(character) {
        this.getElement('character').setCharacter(character);
        var wordsUI = this.getElement('words');
        var words = character.getWords(wordsUI.length);
        var wordsLength = words.length;
        for (var i = 0, cnt = wordsUI.length; i < cnt; i++) {
            if (i < wordsLength) {
                wordsUI[i].show().setText(words[i].word);
            } else {
                wordsUI[i].hide();
            }
        }
        return this;
    }
}

export default CharacterCellSizer;