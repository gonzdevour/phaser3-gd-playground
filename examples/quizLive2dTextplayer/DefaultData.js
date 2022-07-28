import Boot from "./scenes/Boot";
import Home from "./scenes/Home";

import AppLang from "../../plugins/utils/language/AppLang";
import DeviceLang from "../../plugins/utils/language/DeviceLang";

//之後不會變動的預設值

var DefaultAppConfig = {
    appID: 'quizLive2dTextplayer',
    width: 768,
    height: 1334,
    scenes: [Boot, Home],
    sceneKey: {
        Boot: 'Boot',
        Home: 'Home',
    },
    IfCleanStorage: false,
    cors: window.location.hostname == 'localhost'?'https://cors-anywhere-playone.herokuapp.com/':'',
    iapValidatorLink: "https://validator.fovea.cc/v1/validate?appName=com.playone.cp&apiKey=6b024545-4f20-4c11-9848-a30a9682823c",
    tableToJSONKeyHeader: 'tb.',
    rttimerToJSONKey: 'rtt',
    msgQueueToJSONKey: 'msgQ',
}

//之後會變動的預設值(可能因環境或玩家操作而覆蓋的預設值)

var DefaultSettings = {
    appLang: AppLang(),
    appLangAlias: DeviceLang(),
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