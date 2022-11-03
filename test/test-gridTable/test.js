import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';
import CreateTestGridSavePanel from './script/CreateTestGridSavePanel.js';

class Test1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'test1'
        })
    }
    preload() {
        this.load.pack('pack', 'assets/pack.json');
    }
    create() {
        var scene = this;

        //scene.rexScaleOuter.scale(); //scaleOuter在進入scene時不會自動執行，必須每scene呼叫
        //scene.viewport = scene.rexScaleOuter.outerViewport; //on resize時scene.viewport不隨之變動

        scene.viewport = {centerX: 512, centerY:400, width: 1024, height:800}

        var gridTable = CreateTestGridSavePanel(scene)
            .on('cell.click', function(cellContainer, cellIndex, pointer){
                console.log('cell.click ' + cellIndex)
                
                var xFrom = cellContainer.x+200;
                var xTo = cellContainer.x;

                scene.rexUI.add.roundRectangle(xFrom, cellContainer.y, 32, 32, 10, 0xff0000)
                scene.rexUI.add.roundRectangle(xTo, cellContainer.y, 32, 32, 10, 0xff00ff)

                gridTable.tweenChild({
                    targets: cellContainer,
                    x: {from:cellContainer.x+200, to: cellContainer.x},
                    duration:1000,
                })
            })
            .on('cell.down', function(cellContainer, cellIndex, pointer){
                console.log('cell.down ' + cellIndex)
            })
            .on('cell.up', function(cellContainer, cellIndex, pointer){
                console.log('cell.up ' + cellIndex)
            })
            .on('modal.open', function(modalBehavior){
                gridTable.broadcastEvent('gridTable.open', scene);
            })
            .on('modal.close', function(closeEventData, modalBehavior){
                gridTable.broadcastEvent('gridTable.close', scene);
            })
    }
    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1024,
    height: 800,
    scale: {
        mode: Phaser.Scale.FIT,
        //mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: [Test1]
};

var game = new Phaser.Game(config);