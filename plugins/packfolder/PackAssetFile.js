const path = require('path');

var PackAssetFile = function (type, child, config, result) {
    var key = GetKey(child.name);
    var url = GetURL(child.path, config.relatedPathFrom);

    var packResult;
    switch (type) {
        case 'image':
        case 'text':
            packResult = { type: type, key: key, url: url };
            break;

        case 'audio':
            packResult = result[key];
            if (!packResult) {
                packResult = { type: type, key: key, url: [] }
            }
            packResult.url.push(url);
            break;
    }

    return packResult;
}

var GetKey = function (name) {
    return path.parse(name).name;
}

var GetURL = function (path, relatedPathFrom) {
    if (relatedPathFrom !== '') {
        path = path.replace(relatedPathFrom, '');
    }
    return path.replace(/\\/gi, '/').replace(/^(\/)/, '');
}


module.exports = PackAssetFile;