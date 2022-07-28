import Base from './Base.js';

import { soundInit } from '../gdk/api/sound.js';
import { speechInit } from '../gdk/api/speech.js';
import { admobInit } from '../gdk/api/admob.js';
import { iapInit } from '../gdk/api/iap.js';
import { iabInit } from '../gdk/api/iab.js';
import { idfaInit } from '../gdk/api/idfa.js';
import CreateLsData from '../gdk/lsData/CreateLsData.js';
import CreateRTTimers from '../gdk/rttimers/CreateRTTimers.js';
import CreateNRTTimers from '../gdk/rttimers/CreateNRTTimers.js';
import CreateMsgQueue from '../gdk/msgqueue/CreateMsgQueue.js';
import CreateLocalization from '../gdk/localization/CreateLocalization.js';
import loccsv from 'raw-loader!../assets/localization.csv';

import { DefaultAppConfig } from '../DefaultData';
import CordovaDeviceReady from '../gdk/api/CordovaDeviceReady.js';
//loadingUI
import DialogDefault from '../gdk/modaldialog/dialogs/DialogDefault.js';
import LoadingProgressUI from '../gdk/loading/LoadingProgressUI.js';
//log
import CreateLogger from '../gdk/logger/CreateLogger.js';
CreateLogger(false); //因為會用到log函數所以不管要不要顯示都必須建立

var initTools = function(scene){
    var lsData = CreateLsData();
    //工具列表
    scene.game.lsData = lsData;
    scene.game.localization = CreateLocalization(lsData, loccsv);
    scene.game.msgQ = CreateMsgQueue('main',lsData);
    scene.game.rttimer = CreateRTTimers('rttimer',lsData, scene.game.msgQ);
    scene.game.storytimer = CreateNRTTimers('storytimer', lsData, scene.game.msgQ, Date.now());
}

var loadAssets = function(scene){
    scene.load.text('localization', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS7UIICMLMep8fMKULxkMu-OfDcuH3_k18YU1I9eEQQuMtXP7QgVvcvgW3nP488SsrwFhBTSNq9G6KK/pub?gid=1845660007&single=true&output=csv')
    scene.load.pack('pack', 'assets/pack.json');
}

var createTools = async function(scene){
    var packjson = scene.cache.json.get('pack');
    var iapValidatorLink = DefaultAppConfig.iapValidatorLink;
    await CordovaDeviceReady();//依OS.Cordova決定是否等待deviceready
    //工具列表
    scene.game.sound = soundInit(packjson);
    scene.game.speech = speechInit();
    scene.game.admob = admobInit();
    scene.game.iap = iapInit(iapValidatorLink);
    scene.game.iab = iabInit();
    scene.game.idfa = idfaInit();

    //啟動主頁
    if (!scene.ifLoadError){
        scene.scene.start(DefaultAppConfig.sceneKey.Home);
    }
}

class Boot extends Base {
    constructor() {
        super({
            key: DefaultAppConfig.sceneKey.Boot
        })
    }
    init() {
        super.init(); //scaleOuter for loadingUI
        initTools(this);
    }
    preload() {
        //load
        loadAssets(this);
        //loadingProgress
        LoadingProgressUI(this);
        //loadingOnError
        var lo = this.game.localization;
        this.load.once('loaderror', function(fileObj){
            if (!this.ifLoadError){
                this.ifLoadError = true;
                console.log('error-' + fileObj)
                DialogDefault(this, {
                    title: lo.loc('loading-error-title'), 
                    content: lo.loc('loading-error-content',{ filename: fileObj.key }),
                    extraConfig: {
                        width: this.viewport.displayWidth-50,
                        space: { left: 60, right: 60, top: 60, bottom: 60, item: 60, },
                    }
                })
            }
        }, this);
    }
    create() {
        createTools(this);
        console.log('projVer:' + this.cache.text.get('version'));
    }
}

export default Boot;