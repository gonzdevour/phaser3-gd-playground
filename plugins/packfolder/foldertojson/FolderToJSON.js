const dirTree = require("directory-tree");
const PackSubFolders = require('./PackSubFolders.js');

const DefaultConfig = {
    relatedPathFrom: '',
}
var FolderToJSON = function (root, config) {
    if (config === undefined) {
        config = {};
    }

    config = { ...DefaultConfig, ...config };

    var tree = dirTree(root, { attributes: ['type'] });
    var result = PackSubFolders(tree, config);
    if (result.files) {
        result = { packKey: result };
    }

    return result;
}

module.exports = FolderToJSON;