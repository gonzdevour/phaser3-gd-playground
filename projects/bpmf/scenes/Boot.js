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
var tb_audio;

// Preload global data
// 在Boot scene透過Base scene建立跨scene存在的Model
class Boot extends Base {
    constructor() {
        super({
            key: BootSceneKey
        })

    }

    preload() {
        //loading
        var _scene = this;
        async function load(onLoadSuccess, onLoaderror) {
          api = await loading(_scene, tb_audio);
/*           sound = api.sound;
          dialog = api.dialog;
          speech = api.speech;
          iap = api.iap;
          ads = api.ads;
          idfa = api.idfa; */
          console.log("api:" + api);
          onLoadSuccess();
        }
        this.load.rexAwait(load);
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