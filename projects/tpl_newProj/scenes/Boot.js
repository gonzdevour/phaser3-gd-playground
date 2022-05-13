import 'phaser';
import Base from './Base.js';
import * as SceneKey from '../settings/SceneKey.js';
import ToolsPrepare from '../build/model/ToolsPrepare.js';
import ToolsInit from '../build/model/ToolsInit.js';
import Loading from '../loading/Loading.js';

//log
import CreateLogger from '../settings/CreateLogger.js';
CreateLogger(false); //因為會用到log函數所以不管要不要顯示都必須建立

class Boot extends Base {
    constructor() {
        super({
            key: SceneKey.Boot
        })
        ToolsPrepare(this);//建立lsData, appData, localization, api, rtt
    }
    preload() {
        Loading(this); //讀取api, 錯誤訊息會調用this.localization
    }
    create() {
        console.log('projVer:' + this.cache.text.get('version'));
        ToolsInit(this);//db-prebuild, 建立model, 初始化api與appData

        this.scene.launch(SceneKey.Global);
        this.scene.start(SceneKey.Home);
    }

    update() { }
}
export default Boot;