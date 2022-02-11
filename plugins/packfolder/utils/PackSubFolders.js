const fs = require('fs');
const path = require('path');
const PackFolder = require('./PackFolder.js');

const LoaderTypes = ['image', 'text'];
var PackSubFolders = function (baseFolderPath, out) {
    if (out === undefined) {
        out = []
    }

    fs.readdirSync(baseFolderPath).forEach(function (subFolderName) {
        var subFolderPath = baseFolderPath + subFolderName;
        // Is a folder
        if (!fs.lstatSync(subFolderPath).isDirectory()) {
            return;
        }
        // Is an vaild type
        if (LoaderTypes.indexOf(subFolderName) === -1) {
            return;
        }

        // subFolderName will be the name of type
        out = PackFolder(subFolderName, subFolderPath, out);
    });

    return {
        files: out
    };
}

module.exports = PackSubFolders;