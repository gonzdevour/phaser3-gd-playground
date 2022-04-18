import 'phaser';
import Base from './Base.js';
import { BootSceneKey, MainMenuSceneKey } from './Const.js';
import CreateModel from '../build/model/CreateModel.js';
import CreateKnob from '../build/view/style/CreateKnob.js';
import ModalDialogPromise from '../build/view/modeldialog/ModalDialogPromise.js';
import PrebuildDB from '../model/prebuilddb/PrebuildDB.js';

//log
import InitLog from "../../../plugins/logger/InitLog.js";
//api
import { loading, getOS } from "../res/api/index.js";

//log init
InitLog({
    width: "80%",
    height: "30%",
    fontSize: Math.round(window.innerWidth / 20) + "px",
    backgroundColor: "Navy",
    opacity: 0.7,
    active: false,
});
log("logger start");

var api;
var assetPack = {};

// Preload global data
// 在Boot scene透過Base scene建立跨scene存在的Model
class Boot extends Base {
    constructor() {
        super({
            key: BootSceneKey
        })

    }

    preload() {
        var _scene = this;
        //onError
        this.load.once('loaderror', function(fileObj){
            ModalDialogPromise(_scene, {
                title: '讀取異常',
                content: 
`檔案：${fileObj.key}，

請檢查裝置的連線狀態，
稍待片刻重新啟動APP。

如果情況沒有改善，
可能是伺服器正在維護中，
請至官方網站查詢。`,
                buttonMode: 4,    
                width: _scene.viewport.displayWidth-50,
            })
        }, this);
        //load csv from googlesheet
        this.load.text('db0','https://docs.google.com/spreadsheets/d/e/2PACX-1vQWaeZDoFdraJRJtlfcpOpZ0RaBUHn6hO7VkfgH_RwT_qK1D9nLKWJBcXkyvWw9flaU2mUBlbZhSN-c/pub?gid=1563367807&single=true&output=csv')
        this.load.text('db1','https://docs.google.com/spreadsheets/d/e/2PACX-1vQWaeZDoFdraJRJtlfcpOpZ0RaBUHn6hO7VkfgH_RwT_qK1D9nLKWJBcXkyvWw9flaU2mUBlbZhSN-c/pub?gid=999894934&single=true&output=csv')
        //load pack
        this.load.pack('pack', 'assets/pack.json');
        this.load.on('filecomplete-packfile-pack', function(key, filetype, data){
            //asset url dict 
            var pack = data;
            pack.packKey.files.forEach(function(item){
                assetPack[item.type] = assetPack[item.type] == undefined?{}:assetPack[item.type];
                assetPack[item.type][item.key] = assetPack[item.type][item.key] == undefined?{}:assetPack[item.type][item.key];
                if (item.type == 'audio') {
                    item.url.forEach(function(extUrl){
                        var ext = extUrl.split(".").pop();
                        assetPack[item.type][item.key][ext] = extUrl;
                    });
                } else {
                    assetPack[item.type][item.key].url = item.url;
                }
            });
            _scene.log('assetPack:' + '\n' + JSON.stringify(assetPack));

            async function load(onSuccess, onError) {
                api = await loading(this, assetPack['audio']);
                //sound = api.sound;
                //dialog = api.dialog;
                //speech = api.speech;
                //iap = api.iap;
                //ads = api.ads;
                //idfa = api.idfa;
                _scene.log("api:" + api);
                onSuccess();
            }
            this.load.rexAwait(load);//參數:callback(onSuccess,onError)，要執行callback才會完成rexAwait
        }, this)

        var ui = CreateKnob(this).layout();

        ui.waitComplete = this.plugins.get('rexEventPromise').waitComplete;


        this.plugins.get('rexLoadingProgress').add(ui, {
            transitIn: function (gameObject) {
                // Return a promise
                return gameObject.popUpPromise(0);
            },

            transitionOut: function (gameObject) {
                // Return a promise
                return gameObject.waitComplete(_scene.tweens.add({
                    targets: gameObject,
                    ease: 'cubic',
                    alpha: 1,
                    duration: 300
                    }))
                    /*
                    .then(function () {
                        return gameObject.waitComplete(_scene.tweens.add({
                            targets: gameObject,
                            alpha: 0.3,
                            duration: 3000
                        }))
                    })
                    */
            },

            progress: function (gameObject, progress) {
                // Present progress changing
                gameObject.setValue(progress);
            }
        });
        // ui will be destroyed after loading completed

    }

    create() {
        console.log('projVer:' + this.cache.text.get('version'));
        //create model
        this.model = CreateModel({
            db: [
                PrebuildDB(this.cache.text.get('db0')),
                PrebuildDB(this.cache.text.get('db1')),
            ],
            api
        });
        this.model.appData.load() //從ls中取得appData)
        //console.log(this.model.appData);
        this.scene.start(MainMenuSceneKey);
    }

    update() { }
}
export default Boot;