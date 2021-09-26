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
        var cnt = Math.min(buttons.length, characters.length);
        for (var i = 0; i < cnt; i++) {
            buttons[i].setCharacter(characters[i]);
        }
        return this;
    }
}

export default CharactersTable;