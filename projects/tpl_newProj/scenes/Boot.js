import 'phaser';
import Base from './Base.js';
import * as SceneKey from '../settings/SceneKey.js';
import CreateLsData from '../build/model/CreateLsData.js';
import CreateLocalization from '../build/model/CreateLocalization.js';
import CreateModel from '../build/model/CreateModel.js';
import CreateApi from '../build/model/CreateApi.js';
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
        this.lsData = CreateLsData();
        this.api = {};
    }
    init() {
        console.log();
    }
    preload() {
        Loading(this);
    }

    create() {
        console.log('projVer:' + this.cache.text.get('version'));
        //create model
        this.model = CreateModel({
            db: [
                PrebuildDB(this.cache.text.get('db0')),
                PrebuildDB(this.cache.text.get('db1')),
            ],
        });
        CreateApi(this);//CreateApi相依於model
        this.model.appData.init(this);//load & set
        this.game.api.tableManager.add('localization');
        //console.log(this.model.appData);
        this.scene.start(SceneKey.Home);
    }

    update() { }
}
export default Boot;