import SetupLayerManager from '../gdk/layer/SetupLayerManager';
import SetupScaleOuter from '../gdk/viewport/SetupScaleOuter';
import CreateTouchArea from '../gdk/viewport/CreateTouchArea';
import CreateCameraCenter from '../gdk/viewport/CreateCameraCenter';
import CreateToast from '../gdk/toast/CreateToast';

class Base extends Phaser.Scene {

    get debugMode() {
        return false;
    }
    get loggerStyle(){
        var style = {
            width: "80%",
            height: "30%",
            fontSize: Math.round(window.innerWidth / 20) + "px",
            backgroundColor: "Navy",
            opacity: 0.7,
            active: this.debugMode,
        }
        return style;
    }
    init() { //要確定引用的scene沒有init，否則該scene要加super.init()
        //scene kits
        this.vpc = this.plugins.get('rexViewportCoordinate');
        this.layerManager = SetupLayerManager(this);
        this.viewport = SetupScaleOuter(this);    //this.viewport//setup時會順便做一次scale()
        this.toucharea = CreateTouchArea(this);    //this.toucharea, 因為會用到viewport, 這條必須在SetupScaleOuter後
        this.center = CreateCameraCenter(this); //this.center, camera main follows easeMove-able center label
        this.toast = CreateToast(this);

        //sound
        this.audio = this.game.audio?this.game.audio.setup(this):this.game.sound; //將scene傳給this回傳audio，如果this.game.audio不存在則以內建sound為audio

        //scene transition
        this.setupTransition();
    }

    drawBounds(sizer, color) {
        if (this.debugMode) {
            if (this.boundsDrawer == undefined){
                this.boundsDrawer = this.add.graphics();
            }
            if (color == undefined) {
                color = 0xff0000;
            }
            this.boundsDrawer.clear();
            return sizer.drawBounds(this.boundsDrawer, color)
        }
    }

    log(msg) {
        if (this.debugMode) {
            console.log(msg);
        }
    }

    setupTransition() {
        this.events.on('transitionout', function (toScene, duration) {
            var fromScene = this;
            fromScene.tweens.add({
                targets: fromScene.cameras.main,
                alpha: { start: 1, to: 0 },
                delay: 0,
                duration: (duration / 2),
                repeat: 0,
            });

            toScene.tweens.add({
                targets: toScene.cameras.main,
                alpha: { start: 0, to: 1 },
                delay: (duration / 2),
                duration: (duration / 2),
                repeat: 0,
            });
        }, this);

        this.events.on('transitioncomplete', function () {
            var sceneKey = this.sys.config.key;
            this.log(`${sceneKey} transition complete`);
        }, this);
    }

    transitionTo(sceneKey, duration) {
        this.log(`transition to ${sceneKey}`)
        this.scene.transition({
            target: sceneKey,
            duration: duration,
        });
    }
}

export default Base;