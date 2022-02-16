const PackAssetFile = require('./PackAssetFile.js');

var PackAssetFolder = function (tree, config) {
    var type = tree.name;
    var totalPackResults = {};

    tree.children.forEach(function (child) {
        if (child.type === 'file') {
            var packResult = PackAssetFile(type, child, config, totalPackResults);
            if (packResult) {
                totalPackResults[packResult.key] = packResult;
            }
        }
    })

    return Object.values(totalPackResults);
}

module.exports = PackAssetFolder;