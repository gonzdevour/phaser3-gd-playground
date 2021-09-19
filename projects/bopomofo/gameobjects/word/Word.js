import UI from '../../../../plugins/ui-components.js';
import Character from '../character/Character';

const Sizer = UI.Sizer;
const GetValue = Phaser.Utils.Objects.GetValue;

class Word extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var background = GetValue(config, 'background');
        var characters = GetValue(config, 'characters')

        super(scene, config);

        if (background) {
            this.addBackground(background);
        }

        for (var i = 0, cnt = characters.length; i < cnt; i++) {
            this.add(
                characters[i],
                { proportion: 1, expand: true }
            )
        }

        this
            .addChildrenMap('characters', characters)
    }

    setWord(characters) {
        var items = this.getElement('characters');
        var cnt = Math.min(characters.length, items.length);
        for (var i = 0; i < cnt; i++) {
            items[i].setCharacter(characters[i]);
        }
        return this;
    }
}

export default Word;