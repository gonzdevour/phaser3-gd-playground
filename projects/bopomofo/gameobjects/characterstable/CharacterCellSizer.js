import UI from '../../../../plugins/ui-components.js';

const Sizer = UI.Sizer;

class CharacterCellSizer extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        config.orientation = 'x';
        super(scene, config);
        scene.add.existing(this);

        var backgroundCallback = GetValue(config, 'background');
        if (backgroundCallback) {
            this.addBackground(backgroundCallback(scene));
        }

        var characterCallback = GetValue(config, 'character');
        character = characterCallback(scene);
        this.add(character,
            { proportion: 0, expand: true }
        )

        var words = [];
        var wordCount = GetValue(config, 'maxWordCount', 2);
        var wordCallback = GetValue(config, 'word');
        for (var i = 0; i < wordCount; i++) {
            var word = wordCallback(scene);
            this.add(word,
                { proportion: 0, expand: true }
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
        var words = this.getElement('words');
        var wordIDList = character.wid;
        for (var i = 0, cnt = words.length; i < cnt; i++) {

        }
    }
}

export default CharacterCellSizer;