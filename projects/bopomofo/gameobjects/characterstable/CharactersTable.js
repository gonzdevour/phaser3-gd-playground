import UI from '../../../../plugins/ui-components.js';

const GridButtons = UI.GridButtons;
const GetValue = Phaser.Utils.Objects.GetValue;

class CharactersTable extends GridButtons {
    constructor(scene, config) {
        super(scene, config);
        scene.add.existing(this);

        this.pageSize = this.columnCount * this.rowCount;
    }

    setCharacters(characters) {
        var buttons = this.getElement('buttons');
        var charactersLength = characters.length;
        for (var i = 0, cnt = buttons.length; i < cnt; i++) {
            var characterData = (i < charactersLength) ? characters[i] : undefined;
            buttons[i].setCharacter(characterData);
        }
        return this;
    }
}

export default CharactersTable;