const path = require('path');

var PackAssetFile = function (type, fObj) {
    var result;
    switch (type) {
        case 'image':
        case 'text':
            result = {
                type: type,
                key: path.parse(fObj.name).name,
                url: fObj.path.replace(/\\/gi, '/')
            }
            break;
    }

    return result;
}

module.exports = PackAssetFile;