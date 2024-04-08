import Base from './Base.js';
import initBranchScene from '../gdk/scene/InitBranchScene.js';
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
        initBranchScene(this);
    }
    preload(){
        this.load.atlas('mouse', 'assets/open/mouse/mouse.png', 'assets/open/mouse/mouse.json');
    }
    create() {
        var scene = this;
        var bootScene = this.scene.get(DefaultAppConfig.sceneKey.Boot);

        console.log('open scene start')

        //anim
        this.anims.create({ 
            key: 'run', 
            frames: this.anims.generateFrameNames('mouse', { 
                prefix: 'Armature_run_', start: 0, end: 8 }), 
                repeat: -1 
            });
        var mouse = this.add.sprite(400, 300, 'Armature_run_0').play('run');

        //spinner
        var spinner = this.rexSpinner.add.facebook({
            x: 400, y: 500,
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

        //loadingProgress
        var progressUI = CreateBar(this).layout();
        this.onProgress = function (progress) {
            progressUI.setValue(progress);
        }

        //loadingComplete
        this.onClose = function (onComplete) {
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
                scene.tweens.add({
                    targets: spinner,
                    scale: 0,
                    duration: 1000,
                    onComplete: onComplete
                })
            }
        }
    }
}

export default Open;