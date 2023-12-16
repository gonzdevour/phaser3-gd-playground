//之後不會變動的預設值

var DefaultAppConfig = {
    tableToJSONKeyHeader: 'tb.',
    rttimerToJSONKey: 'rtt',
    msgQueueToJSONKey: 'msgQ',
}

//之後會變動的預設值

var DefaultSettings = {
    appID: undefined,
    appLang: undefined,
    appLangAlias: undefined,
    volumeSE: 1, //音效音量
    volumeSpeak: 1, //語音音量
    volumeBGM: 1, //音樂音量
}

//將上面的物件全部複製組成一個物件(物件與陣列不能用var複製否則會指向同一物件)
var DefaultData = Object.assign(
    {},
    DefaultAppConfig,
    DefaultSettings,
);

//LS初始化存入的預設值(排除AppConfig)
var DefaultLSData = Object.assign(
    {},
    DefaultSettings,
);

export {
    DefaultAppConfig,
    DefaultData,
    DefaultLSData,
    DefaultSettings,
}