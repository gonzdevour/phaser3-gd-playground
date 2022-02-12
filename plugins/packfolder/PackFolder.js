const dirTree = require("directory-tree");
const fs = require('fs');
const PackSubFolders = require('./PackSubFolders.js');

var PackFolder = function (root, outFile) {
    if (outFile === undefined) {
        outFile = 'pack.json';
    }

    var tree = dirTree("assets", { attributes: ['type'] });
    var result = PackSubFolders(tree);
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