import Logger from './Logger.js';

var InitLog = function (parent, config) {
    var logger = new Logger(parent, config);
    console.log = function (text) {
        logger.log(text);
    }
}

export default InitLog;