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
        this.load.text('db', 'assets/bopomofo.compress');
    }

    create() {
        this.model = CreateModel({
            db: this.cache.text.get('db'),
        });

        this.scene.start(MainMenuSceneKey);
    }

    update() { }
}
export default Boot;