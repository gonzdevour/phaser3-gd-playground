const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

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

        case 'bitmapFont':
            packResult = totalPackResults[key];
            if (!packResult) {
                packResult = { type: type, key: key }
            }

            if (GetExtend(child.name) === '.xml') {
                packResult.fontDataURL = url;
            } else {
                packResult.textureURL = url;
            }
            break;

        case 'spritesheet':
            packResult = totalPackResults[key];
            if (!packResult) {
                packResult = { type: type, key: key }
            }

            if (GetExtend(child.name) === config.configYamlExtension) {
                packResult = { ...packResult, ...GetYamlObject(child.path) };
            } else {
                packResult.url = url;
            }
            break;

        default:
            // image,text,json,animation,xml,svg,html,
            // css,sceneFile,script,glsl,tilemapTiledJSON,tilemapCSV
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