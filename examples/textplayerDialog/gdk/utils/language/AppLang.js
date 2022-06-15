let DeviceLang = require('./DeviceLang');

var AppLang = function (deviceLang) {
    var deviceLang = deviceLang?deviceLang:DeviceLang();
    var result = 'zh';
    if (deviceLang.indexOf('zh') !== -1){
        result = 'zh';
    } else if (deviceLang.indexOf('en') !== -1){
        result = 'en'
    } else if (deviceLang.indexOf('jp') !== -1){
        result = 'jp'
    }
    return result;
};

module.exports = AppLang;
