import 'phaser';
import Base from './Base.js';
import { BootSceneKey, MainMenuSceneKey } from './Const.js';
import CreateModel from '../build/model/CreateModel.js';
import CreateKnob from '../build/view/style/CreateKnob.js';

//loading


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
    active: true,
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
            console.log('assetPack:' + '\n' + JSON.stringify(assetPack));

            async function load(onSuccess, onError) {
                api = await loading(this, assetPack['audio']);
                //sound = api.sound;
                //dialog = api.dialog;
                //speech = api.speech;
                //iap = api.iap;
                //ads = api.ads;
                //idfa = api.idfa;
                console.log("api:" + api);
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
        //create model
        this.model = CreateModel({
            db: [
                this.cache.text.get('db0'),
                this.cache.text.get('db1'),
            ],
            api
        });
        this.scene.start(MainMenuSceneKey);
    }

    update() { }
}
export default Boot;