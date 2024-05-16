import Base from './Base.js';
import initMasterScene from '../gdk/scene/InitMasterScene.js';

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

import { DefaultAppConfig } from '../settings/DefaultData';
import CordovaDeviceReady from '../gdk/api/CordovaDeviceReady.js';

import DisplayListMethods from 'rexnotePlugins/utils/gameObject/displaylist/DisplayListMethods.js';
import myMethods from '../gdk/myMethods.js';
Object.assign(
    Phaser.GameObjects.GameObject.prototype,
    DisplayListMethods,
    myMethods,
);

//log
import CreateLogger from '../gdk/logger/CreateLogger.js';
CreateLogger(false); //因為會用到log函數所以不管要不要顯示都必須建立

var initTools = function(scene){
    var lsData = CreateLsData();
    //工具列表
    scene.game.style = DefaultAppConfig.style;
    scene.game.lsData = lsData;
    scene.game.localization = CreateLocalization(lsData, loccsv);
    scene.game.msgQ = CreateMsgQueue('main',lsData);
    scene.game.rttimer = CreateRTTimers('rttimer',lsData, scene.game.msgQ);
    scene.game.storytimer = CreateNRTTimers('storytimer', lsData, scene.game.msgQ, Date.now());
}

var loadAssets = function(scene){

    //load csv from googlesheet
    var textToLoad = DefaultAppConfig.assets.text;
    textToLoad.forEach(function(item, idx, arr){
        scene.load.text(item.key, item.url);
    });
    
    //load pack
    var pack = DefaultAppConfig.assets.pack;
    scene.load.pack(pack.key, pack.url);
}

var createTools = async function(scene){
    var packjson = scene.cache.json.get('pack');
    var iapValidatorLink = DefaultAppConfig.iapValidatorLink;
    await CordovaDeviceReady();//依OS.Cordova決定是否等待deviceready
    //工具列表
    scene.game.audio = soundInit(packjson);
    scene.game.speech = speechInit();
    scene.game.admob = admobInit();
    scene.game.iap = iapInit(iapValidatorLink);
    scene.game.iab = iabInit();
    scene.game.idfa = idfaInit();

    //啟動主頁
    if (!scene.ifLoadError){
        //scene.scene.start(DefaultAppConfig.sceneKey.Home);
        scene.transitionTo(DefaultAppConfig.sceneKey.Title, 1000);
    }
}

class Boot extends Base {
    constructor() {
        super({
            key: DefaultAppConfig.sceneKey.Boot
        })
    }
    init() { //如果Base也有init這裡也有init，要呼叫Base的init就要用super.init()
        initMasterScene(this);
        initTools(this);
    }
    preload() {

        var scene = this;

        //啟動open scene(animationScene)執行讀取動畫
        this.plugins.get('rexLoadingAnimationScene').startScene(this, DefaultAppConfig.sceneKey.Open,
            function (successCallback, animationScene) {
                if (animationScene.onClose) { //如果animationScene有onClose這個函數物件，執行並帶入plugin提供的successCallback為參數
                    animationScene.onClose(successCallback);
                }
            },
            function (progress, animationScene) {
                if (animationScene.onProgress) { //如果animationScene有onProgress這個函數物件，執行並帶入plugin提供的progress為參數
                    //console.log(progress)
                    animationScene.onProgress(progress);
                }
            }
        );

        //load
        loadAssets(this);

        //error
        //this.load.image('classroomERR', 'ttps://');//故意錯誤測試
        this.load.once('loaderror', function(fileObj){
            if (!this.ifLoadError){
                this.ifLoadError = true;
                this.loadErrorFileObj = fileObj;
            }
        }, this);

    }
    create() {
        this.scene.stop(DefaultAppConfig.sceneKey.Open)
        createTools(this);
        console.log('projVer:' + this.cache.text.get('version'));
    }
}

export default Boot;