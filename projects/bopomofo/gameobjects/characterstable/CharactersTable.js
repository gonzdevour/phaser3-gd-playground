import UI from '../../../../plugins/ui-components.js';
import CharacterCellSizer from './CharacterCellSizer.js';

const GridTable = UI.GridTable;

class CharactersTable extends GridTable {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        config.scrollMode = 0;

        var createCharacterCellSizerConfig = config.createCharacterCell;
        config.createCellContainerCallback = function (cell, cellContainer) {
            var scene = cell.scene,
                width = cell.width,
                height = cell.height,
                item = cell.item,
                index = cell.index;

            if (cellContainer === null) {
                cellContainer = new CharacterCellSizer(scene, createCharacterCellSizerConfig);
            }
            return cellContainer;
        }
        super(scene, config);
        scene.add.existing(this);
    }
}



export default CharactersTable;