import Logger from './Logger.js';

var InitLog = function (parent, config) {
    var logger = new Logger(parent, config);
    window.logger = logger;
    window.log = function (text) {
        logger.log(text);
    }
    return logger;
}

export default InitLog;