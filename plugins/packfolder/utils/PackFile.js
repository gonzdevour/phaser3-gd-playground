const path = require('path');

var PackFile = function (type, folder, fileName) {
    return {
        type: type,
        key: path.parse(fileName).name,
        url: folder + '/' + fileName
    }
}

module.exports = PackFile;