const fs = require('fs');
const PackSubFolders = require('../utils/PackSubFolders.js');

var Pack = function (root, outFile) {
    if (outFile === undefined) {
        outFile = 'pack.json';
    }

    var result = {
        root: PackSubFolders(root)
    }

    try {
        fs.writeFileSync(outFile, JSON.stringify(result, undefined, 2));
    } catch (err) {
        console.error(err)
    }

}

module.exports = Pack;