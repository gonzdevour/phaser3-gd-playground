import Base from './Base.js';
import initMasterScene from '../gdk/scene/InitMasterScene.js';
import { DefaultData, DefaultAppConfig } from '../settings/DefaultData.js';

//loadingUI
import CreateBar from '../gdk/templates/CreateBar.js';
import DialogDefault from '../gdk/modaldialog/dialogs/DialogDefault.js';

class Open extends Base {
    constructor() {
        super({
            key: DefaultAppConfig.sceneKey.Open
        })
    }
    init(){
        initMasterScene(this);
    }
    preload(){
        this.load.atlas('mouse', 'assets/open/mouse/mouse.png', 'assets/open/mouse/mouse.json');
    }
    create() {
        var scene = this;
        var centerX = scene.viewport.centerX;
        var centerY = scene.viewport.centerY;
        var bootScene = this.scene.get(DefaultAppConfig.sceneKey.Boot);

        console.log('open scene start')

        //anim
        this.anims.create({ 
            key: 'run', 
            frames: this.anims.generateFrameNames('mouse', { 
                prefix: 'Armature_run_', start: 0, end: 8 }), 
                repeat: -1 
            });
        var mouse = this.add.sprite(centerX, centerY-100, 'Armature_run_0').setFlipX(true).play('run');

        //spinner
        // var spinner = this.rexSpinner.add.facebook({
        //     x: 400, y: 500,
        //     width: 200, height: 200
        // });
        // this.tweens.add({
        //     targets: spinner,
        //     scale: { start: 0, to: 1 },
        //     duration: 500
        // })
        // spinner.on('destroy', function () {
        //     console.log('spinner is destroyed')
        // })

        //loadingProgress
        var progressUI = CreateBar(this).layout();
        this.onProgress = function (progress) { //建立onProgress函數，由animationScene plugin執行
            progressUI.setValue(progress);
        }

        //loadingComplete
        this.onClose = function (onComplete) { //建立onClose函數，由animationScene plugin執行，帶入plugin的successCallback
            if (bootScene.ifLoadError){
                console.log('open error-disable scene close')

                var lo = this.game.localization;
                DialogDefault(this, {
                    title: lo.loc('loading-error-title'), 
                    content: lo.loc('loading-error-content',{ filename: bootScene.loadErrorFileObj.key }),
                    extraConfig: {
                        width: this.viewport.displayWidth-50,
                        space: { left: 60, right: 60, top: 60, bottom: 60, item: 60, },
                    }
                })

            } else {
                scene.tweens.add({targets: mouse, x: '+=2000', duration: 1000, onComplete: onComplete }) //tween完執行animationScene plugin的successCallback
                scene.tweens.add({targets: mouse, alpha: 0, duration: 1000, })
            }
        }
    }
}

export default Open;