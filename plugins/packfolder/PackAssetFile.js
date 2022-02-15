const path = require('path');

var PackAssetFile = function (type, child, config, totalPackResults) {
    var key = GetKey(child.name);
    var url = GetURL(child.path, config.relatedPathFrom);

    var packResult;
    switch (type) {
        case 'audio':
            packResult = totalPackResults[key];
            if (!packResult) {
                packResult = { type: type, key: key, url: [] }
            }

            packResult.url.push(url);
            break;

        case 'atlas':
            packResult = totalPackResults[key];
            if (!packResult) {
                packResult = { type: type, key: key }
            }

            if (GetExtend(child.name) === '.json') {
                packResult.atlasURL = url;
            } else {
                packResult.textureURL = url;
            }
            break;

        default: // image,text,json,xml,svg,html,css,sceneFile,script,glsl
            packResult = { type: type, key: key, url: url };
            break;
    }

    return packResult;
}

var GetKey = function (name) {
    return path.parse(name).name;
}

var GetExtend = function (name) {
    return path.extname(name);
}

var GetURL = function (path, relatedPathFrom) {
    if (relatedPathFrom !== '') {
        path = path.replace(relatedPathFrom, '');
    }
    return path.replace(/\\/gi, '/').replace(/^(\/)/, '');
}


module.exports = PackAssetFile;