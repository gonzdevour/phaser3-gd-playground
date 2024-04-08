const path = require('path');
const GenerateVersionFile = require('./GenerateVersionFile.js')

var Preprocessor = function (config) {
    var projectRoot = config.projectRoot;
    var assetsFolder = config.assetsFolder;

    var outputFilePath = path.resolve(assetsFolder, 'text/version.txt');
    GenerateVersionFile(outputFilePath);
}

module.exports = Preprocessor;