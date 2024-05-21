import 'phaser/src/phaser';
import AllPlugins from 'gdkPlugins/AllPlugins.js';

class Test extends Phaser.Scene
{
    preload ()
    {
        this.load.pack('pack', 'assets/pack.json');
    }

    create ()
    {
        var scene = this;

        // 鏡頭與layer設定
        scene.layers = scene.plugins.get('rexLayerManager').add(scene, [
            { name: 'main' },
            { name: 'ui', cameraName: 'ui' },
        ]);
        var camMain = this.cameras.main;
            camMain.setBackgroundColor('#66ccff');
            camMain.setOrigin(0.5, 0.5);
            camMain.setScroll(100, 100);
            camMain.centerXprev = camMain.worldView.centerX; //(centerXprev, centerYprev)是scale.onResize前的畫面中心點
            camMain.centerYprev = camMain.worldView.centerY;
        var camUI = scene.cameras.getCamera("ui")

        // 中心點設定
        var center = scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0xaa9933).setStrokeStyle(2, 0xffffff),
            text: scene.rexUI.add.BBCodeText(0, 0, "center", { fontSize: 24 }),
            //icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
            align: "center",
            space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10}
        })
        .setMinSize(50,50)
        .layout()
        .setPosition(scene.scale.getViewPort().centerX,scene.scale.getViewPort().centerY)

        // viewport設定
        var vpRect = scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10).setStrokeStyle(10, 0xff0000).setOrigin(0,0);
        var viewport = new Phaser.Geom.Rectangle(0, 0, 0, 0);
        var UpdateViewport = (function() {
            var newviewport = scene.scale.getViewPort();
            viewport.setTo(0,0,newviewport.width, newviewport.height);
            vpRect.setSize(viewport.width, viewport.height)
            //vpRect.setSize(scene.cameras.main.worldView.width, scene.cameras.main.worldView.height)
            //camMain.setScroll(center.x,center.y)
            camMain.centerOn(camMain.centerXprev,camMain.centerYprev)
        }).bind(scene);
        scene.scale.on('resize', UpdateViewport);
        UpdateViewport();

        //enable/disable input
        scene.input.enabled = true; // enabled: true/false
        scene.input.setTopOnly(true);
        this.input.setDefaultCursor('url(assets/image/finger.png), pointer'); //自訂鼠標圖示
        //scene.input.dragDistanceThreshold = 16; //至少要拖多少距離才會dragStart, 這會使拖曳產生延遲
        //scene.input.dragTimeThreshold = 500; //至少要拖多少時間才會dragStart, 這會使拖曳產生延遲

        var inputManager = {
            isDraggingGameObject: false,
        }

        //make some things

        var bg = scene.add.image(viewport.centerX, viewport.centerY, 'classroom');

        //官方版本的物件拖曳
        var imgs = [];
        for (let index = 0; index < 20; index++) {
            let randomSize = 0.2
            let randomX = Math.random() * viewport.width;
            let randomY = Math.random() * viewport.height;
            let img = scene.add.image(randomX, randomY, 'right').setScale(randomSize).setInteractive({ draggable: true }) //模擬物件 
                img
                .on('dragstart', function(pointer, dragX, dragY){
                    console.log(`img_dragstart:(${pointer.x},${pointer.y})(${dragX},${dragY})`)
                    inputManager.isDraggingGameObject = true;
                }, scene)
                .on('drag', function(pointer, dragX, dragY){
                    img.setPosition(dragX, dragY);
                    let dist = pointer.getDistance() //取得累積拖曳距離
                    let ang = pointer.getAngle() //取得目前拖曳角度
                    let dur = pointer.getDuration() //取得累積拖曳時間
                    console.log(`dragDist=${dist}, dragAngle=${ang}, dragDuration=${dur}`)
                }, scene)
                .on('dragend', function(pointer, dragX, dragY, dropped){
                    console.log(`img_dragend:(${pointer.x},${pointer.y})(${dragX},${dragY})`)
                    inputManager.isDraggingGameObject = false;
                    img.setTint(0x333333)
                    //img.disableInteractive(); //有bug
                }, scene)
            imgs.push(img);
        }
        var label = scene.rexUI.add.label({ //測試sizer內建的所有輸入操作
            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0x339933).setStrokeStyle(2, 0xffffff),
            text: scene.rexUI.add.BBCodeText(0, 0, "click me", { fontSize: 36 }),
            //icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
            align: "left",
            space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10}
        })
        .setMinSize(100,50)
        .setOrigin(0.5,0.5)
        .layout()
        .setPosition(viewport.centerX,viewport.centerY)
        .onClick(function(button, gameObject, pointer, event) {
            console.log(`label onClick`)
        },scene)

        var btn = scene.rexUI.add.label({ //模擬UI
            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0x339933).setStrokeStyle(2, 0xffffff),
            text: scene.rexUI.add.BBCodeText(0, 0, "UI", { fontSize: 36 }),
            //icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
            align: "left",
            space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10}
        })
        .setMinSize(50,50)
        .setOrigin(0,0)
        .layout()
        .setPosition(10,10)
        .onClick(function(button, gameObject, pointer, event) {
            console.log(`UI onClick`)
        },scene)

        //layer控制

        // //1.使用cameras做layer控制
        // camUI.ignore([imgs, label]);
        // camMain.ignore([btn]);

        //2. 使用layerManager
        scene.layers.addToLayer('main', label);
        scene.layers.addToLayer('main', imgs);
        scene.layers.addToLayer('ui', [bg, center, btn, vpRect]);

        //-------------------

        //pointer
        scene.input
            .on('pointerdown', function(pointer){
                console.log(`pointerdown:(${pointer.x},${pointer.y}) downTime:${pointer.downTime}`)
                ////建立物件在main layer的畫面中央(使用worldView.center)
                //var txt = scene.rexUI.add.BBCodeText(camMain.worldView.centerX, camMain.worldView.centerY, "centerXY", { fontSize: 36 }).setOrigin(0.5,0.5)
                //scene.layers.addToLayer('main', txt);

                ////建立物件在ui layer的畫面中央(因為ui layer的scroll固定為0，所以可以使用viewport)
                //var txt = scene.rexUI.add.BBCodeText(viewport.centerX, viewport.centerY, "centerXY", { fontSize: 36 }).setOrigin(0.5,0.5)
                //scene.layers.addToLayer('ui', txt);
            }, scene)
            .on('pointerdownoutside', function(pointer){ //在dom/game canvas的組合環境下才有作用
                console.log(`pointerdownoutside:(${pointer.x},${pointer.y})`)
            }, scene)
            .on('pointerup', function(pointer){
                console.log(`pointerup:(${pointer.x},${pointer.y}) upTime:${pointer.upTime}`) //可以用upTime-downTime取得duration(ms)
            }, scene)
        btn
            .on('pointerdown', function(pointer, localX, localY, event){
                console.log(`btn_pointerdown:(${pointer.x},${pointer.y})(${localX},${localY})`)
                //event.stopPropagation(); //停止剩下的touch觸發，還不確定怎麼用
            }, scene)
            .on('pointerup', function(pointer, localX, localY, event){
                console.log(`btn_pointerup:(${pointer.x},${pointer.y})(${localX},${localY})`)
            }, scene)
            .on('pointermove', function(pointer, localX, localY, event){ //pc上不用按住就會觸發
                console.log(`btn_pointermove:(${pointer.x},${pointer.y})(${localX},${localY})`)
            }, scene)
            .on('pointerover', function(pointer, localX, localY, event){ //pc上不用按住就會觸發
                console.log(`btn_pointerover:(${pointer.x},${pointer.y})(${localX},${localY})`)
            }, scene)
            .on('pointerout', function(pointer, localX, localY, event){ //pc上不用按住就會觸發
                console.log(`btn_pointerout:(${pointer.x},${pointer.y})(${localX},${localY})`)
            }, scene)

        //dragVector, pinch
        var dragScale = scene.rexGestures.add.pinch(scene);
        dragScale
            .on('drag1', function (dragScale) {
                if (inputManager.isDraggingGameObject == false){ //要先註冊 物件 drag 才能讓 inputManager.isDraggingGameObject=true 先被執行到
                    var drag1Vector = dragScale.drag1Vector;
                    camMain.scrollX -= drag1Vector.x / camMain.zoom;
                    camMain.scrollY -= drag1Vector.y / camMain.zoom;
                    camMain.centerXprev = camMain.worldView.centerX;
                    camMain.centerYprev = camMain.worldView.centerY;
                    console.log(`center(${camMain.centerXprev}, ${camMain.centerYprev})`)
                }
            })
            .on('pinch', function (dragScale) {
                var scaleFactor = dragScale.scaleFactor;
                camMain.zoom *= scaleFactor;
            }, scene)
        
        //tap
        var tap = scene.rexGestures.add.tap({
            // enable: true,
            // bounds: undefined,
            // time: 250,
            // tapInterval: 200,
            // threshold: 9,
            // tapOffset: 10,
            // taps: undefined,
            // minTaps: undefined,
            // maxTaps: undefined,
        })
        .on('tap', function(tap, gameObject, lastPointer){
            console.log(`tap on btn? ${tap.isPointerInGameObject(btn)}`)
        }, scene);

        //press
        var press = scene.rexGestures.add.press({
            // enable: true,
            // bounds: undefined,
            // time: 300, //press好像會影響整個電腦操作?
            // threshold: 9,
        })
        .on('pressstart', function(press, gameObject, lastPointer){
            console.log('press start')
        }, scene)
        .on('pressend', function(press, gameObject, lastPointer){
            console.log('presss end')
        }, scene)

        //swipe
        var swipe = scene.rexGestures.add.swipe({
            // enable: true,
            // bounds: undefined,
            // threshold: 10,
            // velocityThreshold: 1000,
            dir: 'left&right', //只允許左滑或右滑
        })
        .on('swipe', function(swipe, gameObject, lastPointer){
            console.log(`swipeLeft=${swipe.left} swipeRight=${swipe.right}`)
        }, scene)

        //pan
        var pan = scene.rexGestures.add.pan(btn, {
            // enable: true,
            // threshold: 10,
        })
        .on('pan', function(pan, gameObject, lastPointer){ //dragvector
            console.log('pan on btn')
        }, scene)

        //wheel
        var zoomRatio = 1;
        scene.input.on('wheel', function(pointer, currentlyOver, dx, dy, dz, event){
            //滾輪向上dy為負值，向下dy為正值
            console.log(`--dx:${dx},dy:${dy},dz:${dz}, `);
            //向上減，向下加
            zoomRatio = Phaser.Math.Clamp(zoomRatio + 0.1*Math.sign(dy), 0.1, 2)
            scene.tweens.add({
                targets: camMain,
                zoom: zoomRatio,
                ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 1000,
                repeat: 0,            // -1: infinity
                yoyo: false,
            });
        },scene)

        
    }
    update ()
    {
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 600,
    height: 800,
    scale: {
        mode: Phaser.Scale.EXPAND,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    input: {
        smoothFactor: 0.1 //數字愈小時drag愈圓滑，不會瞬移到指定位置而是慢慢滑到
    },
    plugins: AllPlugins,
    scene: Test
};

const game = new Phaser.Game(config);