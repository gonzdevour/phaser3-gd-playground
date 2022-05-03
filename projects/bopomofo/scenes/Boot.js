import 'phaser';
import Base from './Base.js';
import { BootSceneKey, MainMenuSceneKey } from './Const.js';
import CreateModel from '../build/model/CreateModel.js';

// Preload global data
class Boot extends Base {
    constructor() {
        super({
            key: BootSceneKey
        })

    }

    preload() {
        // Load db file
        this.load.text('db0', 'assets/db0.compress');
        this.load.text('db1', 'assets/db1.compress');
    }

    create() {

        var model = CreateModel({
            db: [
                this.cache.text.get('db0'),
                this.cache.text.get('db1'),
            ]
        });
        this.addGlobalProperty('model', model);

        this.scene.start(MainMenuSceneKey);
    }

    update() { }
}
export default Boot;