const PackAssetFile = require('./PackAssetFile.js');

var PackAssetFolder = function (tree, config) {
    var type = tree.name;
    var result = tree.children.map(function (child, index, children) {
        return (child.type === 'file') ? PackAssetFile(type, child, children, config) : null;
    });

    result = result.filter(function (child) {
        return child;
    });

    return result;
}

module.exports = PackAssetFolder;