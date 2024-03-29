import UI from '../../../../plugins/ui-components.js';

//utils
import GetValue from '../../../../plugins/utils/object/GetValue.js';

const Sizer = UI.Sizer;

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

    setWord(characters) { //超出詞長的character組件不加入排版
        var items = this.getElement('characters');
        var charactersLength = characters.length;
        for (var i = 0, cnt = items.length; i < cnt; i++) {
            if (i < charactersLength) {
                items[i].show().setCharacter(characters[i]) //加入排版
            } else {
                items[i].hide(); //不加入排版
            }
        }
        return this;
    }

    clearCharacterBopomofo(index) {
        this.getElement('characters')[index].clearBopomofo();
        return this;
    }

    setCharacterBopomofo(index, config) {
        this.getElement('characters')[index].setBopomofo(config);
        return this;
    }

    getCharacter(index) {
        return this.getElement('characters')[index];
    }

    setWordColor(color) {
        var items = this.getElement('characters');
        for (var i = 0, cnt = items.length; i < cnt; i++) {
            items[i].setCharacterColor(color);
        }
        return this;
    }

    setCharacterColor(index, color) {
        this.getElement('characters')[index].setCharacterColor(color);
        return this;
    }

    // For debug
    // layoutChildren() {
    //     debugger
    //     super.layoutChildren();
    //     return this;
    // }
}

export default Word;