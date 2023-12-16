import Base from './Base.js';
import { DefaultAppConfig } from '../DefaultData.js';

class Hud extends Base {
    constructor() {
        super({
            key: DefaultAppConfig.sceneKey.Hud
        })
    }
    create() {
        var top = this.viewport.top+50;
        var bottom = this.viewport.bottom-50;
        var left = this.viewport.left+50;
        var right = this.viewport.right-50;
        this.add.image(left, top,'ico_yes')
        this.add.image(left, bottom,'ico_yes')
        this.add.image(right, top,'ico_yes')
        this.add.image(right, bottom,'ico_yes')
    }
}

export default Hud;