const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

var PackAssetFile = function (type, child, config, totalPackResults) {
    var key = GetKey(child.name);
    var packResult = totalPackResults[key];
    if (!packResult) {
        packResult = { type: type, key: key };
    }

    var url = GetURL(child.path, config.relatedPathFrom);

    switch (type) {
        case 'audio':
            if (!packResult.url) {
                packResult.url = [];
            }
            packResult.url.push(url);
            break;

        case 'atlas':
            if (GetExtend(child.name) === '.json') {
                packResult.atlasURL = url;
            } else {
                packResult.textureURL = url;
            }
            break;

        case 'bitmapFont':
            if (GetExtend(child.name) === '.xml') {
                packResult.fontDataURL = url;
            } else {
                packResult.textureURL = url;
            }
            break;

        case 'spritesheet':
            if (GetExtend(child.name) === config.configYamlExtension) {
                var packConfig = GetYamlObject(child.path);
                for (var k in packConfig) {
                    packResult[k] = packConfig[k];
                }
            } else {
                packResult.url = url;
            }
            break;

        default:
            // image,text,json,animation,xml,svg,html,
            // css,sceneFile,script,glsl,tilemapTiledJSON,tilemapCSV
            packResult.url = url;
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

var GetURL = function (filePath, relatedPathFrom) {
    if (relatedPathFrom !== '') {
        filePath = filePath.replace(relatedPathFrom, '');
    }
    return filePath.replace(/\\/gi, '/').replace(/^(\/)/, '');
}

var GetYamlObject = function (filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    return yaml.load(content);
}


module.exports = PackAssetFile;