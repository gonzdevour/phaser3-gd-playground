import Base from './Base.js';
import { DefaultData, DefaultAppConfig } from '../settings/DefaultData.js';

class Open extends Base {
    constructor() {
        super({
            key: DefaultAppConfig.sceneKey.Open
        })
    }
    init(){
    }
    create() {
        var scene = this;

        console.log('open animation start')
        //scene.log(`appLang: ${DefaultData.appLang} (${DefaultData.appLangAlias})`);

        var spinner = this.rexSpinner.add.facebook({
            x: 400, y: 300,
            width: 200, height: 200
        });

        this.tweens.add({
            targets: spinner,
            scale: { start: 0, to: 1 },
            duration: 500
        })

        spinner.on('destroy', function () {
            console.log('spinner is destroyed')
        })

        this.onClose = function (onComplete) {
            scene.tweens.add({
                targets: spinner,
                scale: 0,
                duration: 500,
                onComplete: onComplete
            })
        }
    }
}

export default Open;