import { CharactersTable } from "../gameobjects";
import CreateEditableCharacter from './CreateEditableCharacter';

var CreateCharactersTable = function (scene, config) {
    if (config === undefined) {
        config = {};
    }

    var columnCount = 1;
    config.row = 10;
    config.col = 4 * columnCount;
    config.expand = false;
    config.createCellContainerCallback = function (scene, x, y) {
        return CreateEditableCharacter(scene);
    }

    return new CharactersTable(scene, config);
}

export default CreateCharactersTable;