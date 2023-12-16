import Base from './scenes/Base.js';
import { DefaultAppConfig } from './DefaultData.js';

//utils
import DrawToTexture from '../../plugins/utils/image/DrawToTexture.js';

class Test extends Base {
    constructor() {
        super({
            key: DefaultAppConfig.sceneKey.Home
        })
    }
    create() {

        DrawToTexture(this, 300, 300, 300, 400, [
            this.add.image(300, 300, 'ico_arrowL').setScale(3).setAngle(15),
            this.add.image(300, 300, 'ico_confirm').setScale(0.5).setAngle(5),
            this.rexUI.add.alphaMaskImage(300,300,'ico_confirm',{ 
                mask: {
                    key: 'ico_arrowL',
                    // invertAlpha: true,
                    // scale: 4,
                }
            }).setAngle(30)
        ], 'newImg', true)

        this.input.on('pointerdown', function(pointer){
            this.add.image(pointer.worldX,pointer.worldY,'newImg');
        },this)
    }
}


export default Test;