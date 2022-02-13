import 'phaser';

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

    create() {

        this.sysPanel = this.rexUI.add.overlapSizer({})
            .setPosition(this.viewport.centerX, this.viewport.centerY)
            .setMinSize(this.viewport.displayWidth, this.viewport.displayHeight)
            .layout()

    }
    scaleOuter() {
        //scale outer
        this.rexScaleOuter.scale();
    }
}
export default Base;