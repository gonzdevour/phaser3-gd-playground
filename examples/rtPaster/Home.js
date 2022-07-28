import Base from './scenes/Base.js';
import { DefaultAppConfig } from './DefaultData.js';

//utils
import DrawToTexture from '../../plugins/utils/image/DrawToTexture.js';

class Home extends Base {
    constructor() {
        super({
            key: DefaultAppConfig.sceneKey.Home
        })
    }
    create() {

        DrawToTexture(this, 0, 0, 200, 400, [
            this.add.image(0, 0, 'ico_arrowL').setOrigin(0,0).setScale(3).setAngle(15),
            this.add.image(0, 0, 'ico_confirm').setOrigin(0,0).setScale(0.5).setAngle(5),
            this.rexUI.add.alphaMaskImage(0,0,'ico_confirm',{ 
                mask: {
                    key: 'ico_arrowL',
                    // invertAlpha: true,
                    // scale: 4,
                }
            }).setOrigin(0,0).setAngle(30)
        ], 'newImg', true)

        this.input.on('pointerdown', function(pointer){
            this.add.image(pointer.worldX,pointer.worldY,'newImg');
        },this)
    }
}


export default Home;