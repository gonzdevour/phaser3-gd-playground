const GetURL = require('./GetURL.js');
const path = require('path');

var PackAssetFile = function (type, fObj, fObjs, config) {
    var result;
    switch (type) {
        case 'image':
        case 'text':
            result = {
                type: type,
                key: path.parse(fObj.name).name,
                url: GetURL(fObj.path, config.relatedPathFrom)
            }
            break;
    }

    return result;
}

module.exports = PackAssetFile;