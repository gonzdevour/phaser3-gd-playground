const PackAssetFile = require('./PackAssetFile.js');

var PackAssetFolder = function (tree, config) {
    var type = tree.name;
    var result = {};

    tree.children.forEach(function (child) {
        if (child.type === 'file') {
            var packResult = PackAssetFile(type, child, config, result);
            if (packResult) {
                result[packResult.key] = packResult;
            }
        }
    })

    return Object.values(result);
}

module.exports = PackAssetFolder;