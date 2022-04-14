var util = require("util");

var Preprocessor = function (config) {
    // config = {projectRoot, assetsFolder}
    console.log('Global preprocessor');
    console.log(util.inspect(config, { showHidden: false, depth: null }));
}

module.exports = Preprocessor;