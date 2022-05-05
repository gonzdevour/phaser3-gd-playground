import 'phaser';
import Base from './Base.js';
import * as SceneKey from '../settings/SceneKey.js';
import CreateLsData from '../build/model/CreateLsData.js';
import CreateAppData from '../build/model/CreateAppData.js';
import CreateLocalization from '../build/model/CreateLocalization.js';
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
        this.lsData = CreateLsData();
        this.appData = CreateAppData(this.lsData);
        this.localization = CreateLocalization(this.lsData);
        this.api = {}; //在loading中讀完後處理為scene.game.api
    }
    init() {
        console.log('boot init');
    }
    preload() {
        Loading(this); //錯誤訊息會調用this.localization
    }
    create() {
        console.log('projVer:' + this.cache.text.get('version'));
        //create model
        this.model = CreateModel({
            db: [
                PrebuildDB(this.cache.text.get('db0')),
                PrebuildDB(this.cache.text.get('db1')),
            ],
            lsData: this.lsData,
            appData: this.appData,
            localization: this.localization
        });
        //必須在api讀取完成後執行。為了控制scene.game.api的數值(例如已儲存的語系和音量)所以要帶scene
        this.model.appData.initAPI(this);
        //遊戲數值初始化
        this.model.appData.initGame();
        //this.model.tableManager.add(this, 'localization');
        //console.log(this.model.appData);
        this.scene.start(SceneKey.Home);
    }

    update() { }
}
export default Boot;