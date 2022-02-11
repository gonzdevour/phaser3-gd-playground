const fs = require('fs');
const PackFile = require('./PackFile.js');

var PackFolder = function (type, folder, out) {
    if (out === undefined) {
        out = [];
    }

    fs.readdirSync(folder).forEach(function (fileName) {
        out.push(PackFile(type, folder, fileName));
    })

    return out;
}

module.exports = PackFolder;
