import UI from '../../../../plugins/ui-components.js';

const Sizer = UI.Sizer;
const GetValue = Phaser.Utils.Objects.GetValue;

class Word extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);

        var background = GetValue(config, 'background');
        if (background) {
            this.addBackground(background);
        }

        this.addSpace();

        var characters = GetValue(config, 'characters')
        for (var i = 0, cnt = characters.length; i < cnt; i++) {
            this.add(
                characters[i],
                { proportion: 0, expand: false }
            )
        }

        this.addSpace();

        this
            .addChildrenMap('background', background)
            .addChildrenMap('characters', characters)
    }

    setWord(characters) {
        var items = this.getElement('characters');
        var charactersLength = characters.length;
        for (var i = 0, cnt = items.length; i < cnt; i++) {
            if (i < charactersLength) {
                items[i].show().setCharacter(characters[i])
            } else {
                items[i].hide();
            }
        }
        return this;
    }

    getCharacter(index) {
        return this.getElement('characters')[index];
    }
}

export default Word;