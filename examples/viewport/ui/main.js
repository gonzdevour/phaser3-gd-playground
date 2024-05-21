import 'phaser/src/phaser';
import AllPlugins from 'gdkPlugins/AllPlugins.js';
import SetupLayerManager from './SetupLayerManager';
import SetupViewport from './SetupViewport';
import createTextLabel from './create/createTextLabel.js';
import createBg from './create/createBg.js'
import createImg from './create/createImg.js'

import myMethods from './myMethods.js'; //_locate系列要預設有scene.viewport
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
        var camMain = scene.cameras.main
            camMain.setBackgroundColor('#66ccff');
        //scene kits
        scene.vpc = scene.plugins.get('rexViewportCoordinate');
        scene.layerManager = SetupLayerManager(scene); //建立layers以及各layer專屬的camera
        scene.viewport = SetupViewport(scene, true); //scene, testMode(測試範圍框)
        var viewport = scene.viewport;

        //make some things

        //var bg = createBg(scene, "bg", 0.5, 0.5, "classroom");
        var bg = createImg(scene, "bg", undefined, undefined, "classroom", viewport.centerX, viewport.centerY);
        var obj = createTextLabel(scene, "go", undefined, undefined, "OBJ", 100, 100);
        var center = createTextLabel(scene, "ui", 0.5, 0.5, "center");
        var anchorLT = createTextLabel(scene, "ui", 0, 0, "anchorLT", 100, 50);
        var anchorRT = createTextLabel(scene, "ui", 1, 0, "anchorRT", -100, 50);
        var anchorLB = createTextLabel(scene, "ui", 0, 1, "anchorLB", 100, -50);
        var anchorRB = createTextLabel(scene, "ui", 1, 1, "anchorRB", -100, -50);

        //以下操作camMain

        //dragVector, pinch
        var dragScale = scene.rexGestures.add.pinch(scene);
        dragScale
            .on('drag1', function (dragScale) {
                var drag1Vector = dragScale.drag1Vector;
                camMain.scrollX -= drag1Vector.x / camMain.zoom;
                camMain.scrollY -= drag1Vector.y / camMain.zoom;
                camMain.centerXprev = camMain.worldView.centerX;
                camMain.centerYprev = camMain.worldView.centerY;
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