import 'phaser';
import { DialogY } from '../build/view/modaldialog/DialogType.js';

/* 
Base class的主要功能就是控制Model這個變數，有兩個學習重點：

1.跨scene變數

在第一次被import後，Model就存在，只要其他scene也import了Base.js，
在其他scene也可以共通使用Model變數(就跟全域變數類似)

2.父類別屬性/函數的呼叫

class sceneA extends Base之後，如果sceneA沒有model變數，
就會往父類別(Base)來尋找model，也因此可以透過Base來控制model的get/set。
如果sceneA自己有model變數，則不會往父類別尋找model。

這邊使用class Base還有一個理由，
就是其他scene可以用super.create()來執行this.rexScaleOuter.scale();這種跨scene共通的create。

*/

var Model;

class Base extends Phaser.Scene {
    set model(value) { //set: 'this.model = '時觸發，例如Boot.js中，this.model = CreateModel();
        // 如果Model有值就不允許再次設定
        if (Model !== undefined) {
            return;
        }

        Model = value;

        // game移除時清空Model記憶體
        this.game.events.on('destroy', function () {
            Model = undefined;
        })
    }
    get model() { //get: 'this.model'時觸發
        return Model;
    }

    get viewport() { //簡化呼叫
        //直橫版尺寸調整
        var v = this.rexScaleOuter.outerViewport;
        var vw = v.width;
        var vh = v.height;       
        v.displayWidth = vw>vh?(vh/1.6):vw;
        v.displayHeight = vh;
        return v; 
    }

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

    create() {
        this.createSysPanel();
        this.setupTransition();
        this.game.msgQ
            .setPopCallback(msgQPopCallback,this) //popCallback跟著scene所以要每個scene都set
            .startPop() //彈出ls中的msg，popAll會偵測若empty則break
        
        this.input.on('wheel',function(){
            this.game.storytimer.pushTime({s:1})
            console.log('push 1 sec')
        },this)

    }

    scaleOuter() {
        //scale outer
        this.rexScaleOuter.scale();
    }

    createSysPanel() {
        this.sysPanel = this.rexUI.add.overlapSizer({})
            .setPosition(this.viewport.centerX, this.viewport.centerY)
            .setMinSize(this.viewport.displayWidth, this.viewport.displayHeight)
            .layout()
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

//這邊的this被popAll→pop→await callback.call(scope, message, this.messages)的scope所指定
//換句話說，就是msgQ.startPop(PopCallback, this)的this。
var msgQPopCallback = async function (msg) {
    var lo = this.game.localization;
    var result = await DialogY(this, {
        title: lo.loc('select-db-title'), 
        content: msg.id
    })
    //return (result.index === 0);//true:繼續popAll，false:中斷popAll
    return true;
}

export default Base;