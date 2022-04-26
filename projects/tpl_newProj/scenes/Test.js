import 'phaser';
import Base from './Base.js';
import CreateModel from '../build/model/CreateModel.js';
import PrebuildDB from '../model/prebuilddb/PrebuildDB.js';
import Loading from '../loading/Loading.js';
//plugins
import AllPlugins from '../../../plugins/AllPlugins.js';
//log
import CreateLogger from '../settings/CreateLogger.js';
CreateLogger(false); //因為會用到log函數所以不管要不要顯示都必須建立

//Test
class Test extends Base {
    constructor() {
        super({
            key: 'test'
        })
        this.api = {};
    }

    preload() {
        Loading(this);
    }

    create() {
        //init model
        var api = this.api;
        this.model = CreateModel({
            db: [
                PrebuildDB(this.cache.text.get('db0')),
                PrebuildDB(this.cache.text.get('db1')),
            ],
            api
        });
        this.model.appData.load()
        //Base: this.rexScaleOuter.scale();
        super.scaleOuter(); 
        var _scene = this;
        //從這裡開始寫create scene的內容

        console.log('hello test!');

        //因為UI要在最上方所以必須放最後一行。createSysPanel & setupTransition
        super.create(); 
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 768,
    height: 1334,
    scale: {
        mode: Phaser.Scale.RESIZE, //scaleOuter plugin需要RESIZE mode
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: [Test]
};

var game = new Phaser.Game(config);