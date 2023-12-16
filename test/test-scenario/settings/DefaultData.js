import Boot from "../scenes/Boot";
import Title from "../scenes/Title";
//import Home from "../scenes/Home";
import Story from "../scenes/Story";
import Home from '../scenes/Test';

import AllPlugins from '../../../plugins/AllPlugins.js';
import AppLang from "../../../plugins/utils/language/AppLang";
import DeviceLang from "../../../plugins/utils/language/DeviceLang";

import style from './Style.js';

//之後不會變動的預設值

var DefaultAppConfig = {
    appID: 'demo',
    width: 768,
    height: 1334,
    scenes: [Boot, Title, Home, Story],
    sceneKey: {
        Boot: 'Boot',
        Title: 'Title',
        Home: 'Home',
        Story: 'Story',
    },
    layers: ['bg','main','scenario_stage','scenario_story','scenario_choices','scenario_ui','ui','dialog','system'],
    assets: {
        pack:{ key:'pack', url:'assets/pack.json' },
        text:[
            { 
                key:'localization',
                url:'https://docs.google.com/spreadsheets/d/e/2PACX-1vS7UIICMLMep8fMKULxkMu-OfDcuH3_k18YU1I9eEQQuMtXP7QgVvcvgW3nP488SsrwFhBTSNq9G6KK/pub?gid=1845660007&single=true&output=csv', 
            },
            { 
                key:'dataChar',
                url:'https://docs.google.com/spreadsheets/d/e/2PACX-1vTVH0ovFueknTvQVLeui-v7BzWilg__WAHtaCJpnojaTUnGLj_fCPJuJn5RlvAAk6nE4SftO0Ju_f_W/pub?gid=522351148&single=true&output=csv', 
            },
            { 
                key:'story',
                url:'https://docs.google.com/spreadsheets/d/e/2PACX-1vTVH0ovFueknTvQVLeui-v7BzWilg__WAHtaCJpnojaTUnGLj_fCPJuJn5RlvAAk6nE4SftO0Ju_f_W/pub?gid=1513197210&single=true&output=csv', 
            },
        ],
    },
    scaleMode: Phaser.Scale.RESIZE,
    scaleAutoCenter: Phaser.Scale.CENTER_BOTH,
    plugins: AllPlugins,
    style: style,
    IfCleanStorage: false,
    cors: window.location.hostname == 'localhost'?'https://cors-anywhere.herokuapp.com/':'',
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