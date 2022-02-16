const FolderToJSON = require('./foldertojson/FolderToJSON.js');
const fs = require('fs');

var PackFolder = function (root, outFile, config) {
    if (outFile === undefined) {
        outFile = 'pack.json';
    }

    var result = FolderToJSON(root, config);

    try {
        fs.writeFileSync(outFile, JSON.stringify(result, undefined, 2));
    } catch (err) {
        console.error(err)
    }

}

module.exports = PackFolder;