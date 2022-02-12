const PackAssetFile = require('./PackAssetFile.js');

var PackAssetFolder = function (tree) {
    var type = tree.name;
    var result = tree.children.map(function (child) {
        return (child.type === 'file') ? PackAssetFile(type, child) : null;
    });

    result = result.filter(function (child) {
        return child;
    });

    return result;
}

module.exports = PackAssetFolder;