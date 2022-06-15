var DeviceLang = function () {
    var deviceLang = navigator.language || navigator.userLanguage;
    return deviceLang;
};

module.exports = DeviceLang;
