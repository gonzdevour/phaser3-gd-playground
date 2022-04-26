import 'phaser';
import Base from './Base.js';
import * as SceneKey from '../settings/SceneKey.js';
import CreateModel from '../build/model/CreateModel.js';
import PrebuildDB from '../model/prebuilddb/PrebuildDB.js';
import Loading from '../loading/Loading.js';
//log
import CreateLogger from '../settings/CreateLogger.js';
CreateLogger(false); //因為會用到log函數所以不管要不要顯示都必須建立

class Boot extends Base {
    constructor() {
        super({
            key: SceneKey.Boot
        })
        this.api = {};
    }
    preload() {
        Loading(this);
    }

    create() {
        console.log('projVer:' + this.cache.text.get('version'));
        //create model
        var api = this.api;
        //debugger;
        this.model = CreateModel({
            db: [
                PrebuildDB(this.cache.text.get('db0')),
                PrebuildDB(this.cache.text.get('db1')),
            ],
            api
        });
        this.model.appData.load() //從ls中取得appData)
        //console.log(this.model.appData);
        this.scene.start(SceneKey.Home);
    }

    update() { }
}
export default Boot;