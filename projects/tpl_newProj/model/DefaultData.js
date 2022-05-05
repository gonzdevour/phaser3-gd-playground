//Model.js使用的預設值

var DefaultAppConfig = {
    appID: 'bopomofo',
    tableToJSONKeyHeader: 'tb.',
    cleanLocalStorage: false,
}

var DefaultSettings = {
    volumeSE: 1, //音效音量
    volumeSpeak: 1, //語音音量
    volumeBGM: 1, //音樂音量
    appLang: undefined,
    appLangAlias: undefined,
}

var DefaultQuizConfig = {
    database: '常用詞庫', //指定詞庫種類
    enhancement: '無', //強化練習模式
    mode: '隨機', //頻次|隨機|測驗
    qcount: 10, //題數
}

var DefaultRecord = {
    wrongList: [], //複習詞表(答錯紀錄)
    rightList: [], //答對過的詞
}

//將上面的物件全部複製組成一個物件(物件與陣列不能用var複製否則會指向同一物件)
var DefaultData = Object.assign(
    {},
    DefaultAppConfig,
    DefaultSettings,
    DefaultQuizConfig,
    DefaultRecord,
);

export {
    DefaultAppConfig,
    DefaultData,
    DefaultSettings,
    DefaultQuizConfig,
    DefaultRecord,
}