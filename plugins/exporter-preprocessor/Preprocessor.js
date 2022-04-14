var util = require("util");

var Preprocessor = function (config) {
    console.log('Global preprocessor');
    console.log(util.inspect(config, { showHidden: false, depth: null }));
}

module.exports = Preprocessor;