const dirTree = require("directory-tree");
const fs = require('fs');
const PackSubFolders = require('./PackSubFolders.js');

const DefaultConfig = {
    relatedPathFrom: '',
}
var PackFolder = function (root, outFile, config) {
    if (outFile === undefined) {
        outFile = 'pack.json';
    }

    if (config === undefined) {
        config = {};
    }

    config = { ...DefaultConfig, ...config };

    var tree = dirTree(root, { attributes: ['type'] });
    var result = PackSubFolders(tree, config);
    if (result.files) {
        result = { packKey: result };
    }

    try {
        fs.writeFileSync(outFile, JSON.stringify(result, undefined, 2));
    } catch (err) {
        console.error(err)
    }

}

module.exports = PackFolder;