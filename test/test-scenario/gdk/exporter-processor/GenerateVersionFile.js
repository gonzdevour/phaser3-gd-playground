const fs = require('fs');

var GenerateVersionFile = function (outputFilePath) {
    var content = new Date().getTime().toString();

    try {
        fs.writeFileSync(outputFilePath, content);
    } catch (err) {
        console.error(err)
    }
}

module.exports = GenerateVersionFile;