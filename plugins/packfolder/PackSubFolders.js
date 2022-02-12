const PackAssetFolder = require('./PackAssetFolder.js');

const LoaderTypes = ['image', 'text'];
var PackSubFolders = function (tree) {
    var subFolders = tree.children.filter(function (child) {
        return child.type === 'directory';
    });

    var assetsFolders = subFolders.filter(function (child) {
        return (LoaderTypes.indexOf(child.name) !== -1);
    });

    var result = {};
    if (assetsFolders.length > 0) {
        var files = [];
        assetsFolders.forEach(function (child) {
            files.push(...PackAssetFolder(child));
        })
        result.files = files;
    } else {
        subFolders.forEach(function (child) {
            var name = child.name;
            if (LoaderTypes.indexOf(name) === -1) {
                result[name] = PackSubFolders(child);
            }
        })
    }

    return result;
}

module.exports = PackSubFolders;