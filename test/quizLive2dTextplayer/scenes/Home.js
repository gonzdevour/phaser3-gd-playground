import Base from './Base.js';
import { DefaultAppConfig } from '../DefaultData.js';
//scripts
import CreateParallelBackgrounds from '../scripts/CreateParallelBackgrounds.js';
import CreateTextplayer from '../scripts/CreateTextplayer.js';
import StartQuiz from '../scripts/StartQuiz.js';
import eyeTracking from '../scripts/eyeTracking.js';
//utils
import zoomFrom from '../gdk/viewport/zoomFrom.js';

class Home extends Base {
    constructor() {
        super({
            key: DefaultAppConfig.sceneKey.Home
        })
    }
    create() {

        this.scene.launch('Hud');
        //console.log(JSON.stringify(this.cache.json.get('pkg')));

        //建立背景
        var bgSet = CreateParallelBackgrounds(this, this.viewport.centerX, this.viewport.centerY, 'bgSetForestZ', 6);

        
        this.rexScaleOuter.stop().scale();//停止scaleOuter plugin在進入scene時的那一次自動scale()，讓create時camera.scroll能正常運作
        zoomFrom(this, 0.9, 3000);//cam縮放
        this.cameras.main.stopFollow();
        this.center.setPosition(this.center.x, this.center.y+300)//cam從下方lerp+back上移
        this.cameras.main.setScroll(this.center.x, this.center.y);
        this.cameras.main.startFollow(this.center, true, 0.5, 0.5);
        this.tweens.add({
            targets: this.center,
            y: '-=300',
            ease: 'back-easeOutIn',
            duration: 2000,
            //yoyo: true,
            //repeat: -1,
        })

        //建立textplayer
        this.textPlayer = CreateTextplayer(this);

        //啟動問答
        this.input.once('pointerup', function () {
            this.textPlayer.setVisible(true);
            StartQuiz(this, this.textPlayer);
        },this)

        // this.input.on('pointerdown', function(pointer){
        //     this.cameras.main.shake(500,0.1);
        //     this.game.sound.play(this, 'right');
        // },this)
    }

    update(){
        //eyeTracking(this);
    }
}

export default Home;