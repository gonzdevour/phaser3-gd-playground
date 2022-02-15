import 'phaser';
import Base from './Base.js';
import { BootSceneKey, MainMenuSceneKey } from './Const.js';
import CreateModel from '../build/model/CreateModel.js';

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
var audioUrls;

// Preload global data
// 在Boot scene透過Base scene建立跨scene存在的Model
class Boot extends Base {
    constructor() {
        super({
            key: BootSceneKey
        })

    }

    preload() {
        //load pack
        this.load.pack('pack', 'assets/pack.json');
    }

    create() {
        //asset url dict 
        var pack = this.cache.json.get('pack')
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

        var _scene = this;

        var modelInit = function(_scene){
            //create model
            _scene.model = CreateModel({
                db: [
                    _scene.cache.text.get('db0'),
                    _scene.cache.text.get('db1'),
                ],
                api
            });
            _scene.scene.start(MainMenuSceneKey);
        };

        async function load() {
            api = await loading(_scene, assetPack['audio']);
/*           sound = api.sound;
            dialog = api.dialog;
            speech = api.speech;
            iap = api.iap;
            ads = api.ads;
            idfa = api.idfa; */
            console.log("api:" + api);
            modelInit(_scene);
        }
        load();
        //this.load.rexAwait(load);

    }

    update() { }
}
export default Boot;