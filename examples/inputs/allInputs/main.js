import 'phaser';
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
        var viewport = scene.scale.getViewPort();
        var camMain = this.cameras.main;
            camMain.setBackgroundColor('#66ccff');
        var camUI = scene.cameras.add();
        //camMain.scrollX = 500

        //enable/disable input
        scene.input.enabled = true; // enabled: true/false
        scene.input.setTopOnly(false);

        var inputManager = {
            isDraggingGameObject: false,
        }

        //make some things
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
                }, scene)
                .on('dragend', function(pointer, dragX, dragY, dropped){
                    console.log(`img_dragend:(${pointer.x},${pointer.y})(${dragX},${dragY})`)
                    inputManager.isDraggingGameObject = false;
                    img.disableInteractive();
                    img.setTint(0x333333)
                }, scene)

            camUI.ignore(img);
        }
        var btn = scene.rexUI.add.roundRectangle(100, 80, 100, 100, 0, 0x008888).setScrollFactor(0,0).setInteractive({ draggable: true }); //模擬UI
        camMain.ignore(btn);

        //-------------------

        //pointer
        scene.input
            .on('pointerdown', function(pointer){
                console.log(`pointerdown:(${pointer.x},${pointer.y})`)
            }, scene)
            .on('pointerdownoutside', function(pointer){
                console.log(`pointerdownoutside:(${pointer.x},${pointer.y})`)
            }, scene)
            .on('pointerup', function(pointer){
                console.log(`pointerup:(${pointer.x},${pointer.y})`)
            }, scene)
        btn
            .on('pointerdown', function(pointer, localX, localY, event){
                console.log(`btn_pointerdown:(${pointer.x},${pointer.y})(${localX},${localY})`)
                event.stopPropagation(); //停止剩下的touch觸發，還不確定怎麼用
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
                }
            })
            .on('pinch', function (dragScale) {
                var scaleFactor = dragScale.scaleFactor;
                camMain.zoom *= scaleFactor;
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
    plugins: AllPlugins,
    scene: Test
};

const game = new Phaser.Game(config);