import Logger from './Logger.js';

var InitLog = function (parent, config) {
    if (parent.active) {
        var logger = new Logger(parent, config);
        window.logger = logger;
        window.log = function (text) {
            logger.log(text);
            console.log(text);
        }
        return logger;
    } else {
        window.log = function (text) {
            console.log(text);
        } 
    }

}

export default InitLog;