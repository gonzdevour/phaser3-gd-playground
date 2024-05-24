import 'phaser/src/phaser';
import AllPlugins from 'gdkPlugins/AllPlugins.js';
import myMethods from './settings/myMethods.js';
import SetupLayerManager from './settings/SetupLayerManager.js';
import SetupViewport from './settings/SetupViewport.js';
//camera
import CameraDragScroll from "./gdk/camera/CameraDragScroll.js";
import CameraWheelZoom from "./gdk/camera/CameraWheelZoom.js";

Object.assign(
    Phaser.GameObjects.GameObject.prototype,
    myMethods,
);

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
        var camMain = scene.cameras.main
            camMain.setBackgroundColor('#66ccff');
        //scene kits
        scene.vpc = scene.plugins.get('rexViewportCoordinate');
        scene.layerManager = SetupLayerManager(scene); //建立layers以及各layer專屬的camera
        scene.viewport = SetupViewport(scene, true); //scene, testMode(測試範圍框)
        var viewport = scene.viewport;

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

        //enable/disable input
        scene.input.enabled = true; // enabled: true/false
        scene.input.setTopOnly(true);
        this.input.setDefaultCursor('url(assets/image/finger.png), pointer'); //自訂鼠標圖示
        //scene.input.dragDistanceThreshold = 16; //至少要拖多少距離才會dragStart, 這會使拖曳產生延遲
        //scene.input.dragTimeThreshold = 500; //至少要拖多少時間才會dragStart, 這會使拖曳產生延遲

        //dragVector, pinch
        CameraDragScroll(scene);//camMain.enableDragScroll = true/false
        CameraWheelZoom(scene); //camMain.enableWheelZoom = true/false

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
                    //禁止cam操作
                    camMain.enableDragScroll = false;
                    camMain.enableWheelZoom = false;
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
                    //重啟cam操作
                    camMain.enableDragScroll = true
                    camMain.enableWheelZoom = true
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
        })
        .on('over', function(gameObject, pointer, event) {
            console.log('label over')
            debugger
        })
        .setChildrenInteractive() //讓label(sizer)中的子物件發射互動事件(注意background不算child)
        .on('child.over', function(child, pointer, event) {
            console.log('child over')
        })

        var imgUploadLabel = scene.rexUI.add.imageInputLabel({
            // x: 0,y: 0,anchor: undefined,width: undefined,height: undefined,origin: 0.5,originX:0,originY:0,rtl: false,
            orientation: 1,
            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0x663399).setStrokeStyle(2, 0xffffff),
            canvas: {
                // width: 128, 
                // height: 128,
                fill: 'gray',
                // key: undefined, 
                // frame: undefined,        
            },
            // scaleUpIcon: false,
            iconBackground: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0x993333).setStrokeStyle(2, 0xffffff),   
            // squareFitIcon: false,
            // iconSize: undefined, 
            iconWidth: 150, iconHeight: 150,
            text: scene.rexUI.add.BBCodeText(0, 0, "UPLOAD", { fontSize: 36 }),
            expandTextWidth: false,
            expandTextHeight: false,
            action: scene.rexUI.add.BBCodeText(0, 0, "SAVE", { fontSize: 24 }),
            // actionMask: false,
            // squareFitAction: false,
            // actionSize: undefined, actionWidth: undefined, actionHeight: undefined,
            align: 'center',
            space: {
                left: 20, right: 20, top: 20, bottom: 20,
                icon: 10, iconTop: 0, iconBottom: 0, iconLeft: 0, iconRight: 0,
                text: 20,
                actionTop: 0, actionBottom: 0, actionLeft: 0, actionRight: 0,
            },
            // name: '',
            // draggable: false,
            // sizerEvents: false,
            // enableLayer: false,
            clickTarget: 'icon',
            // domButton: true,
        })
        .setMinSize(100,100)
        .setOrigin(0,0)
        .layout()
        .setPosition(150,150)

        imgUploadLabel
        .on('select', function (file, label) {
            console.log(file);
            label.setText(label.getFileName(file));
        })
        .onClick(imgUploadLabel.getElement('action'), function () {
            var key = imgUploadLabel.text;
            imgUploadLabel.saveTexture(key);
            console.log(`Save texture ${key}`)

            // Display new texture
            if (!gameObject) {
                gameObject = this.add.image(0, 0, '').setOrigin(0);
            }
            gameObject.setTexture(key);
        }, this)

        //layer控制

        scene.layerManager.addToLayer('bg', bg);
        scene.layerManager.addToLayer('main', label);
        scene.layerManager.addToLayer('main', imgs);
        scene.layerManager.addToLayer('ui', [center, btn, imgUploadLabel]);

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