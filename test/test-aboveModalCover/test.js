import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';

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
        var layer1 = this.add.layer();
        var layer2 = this.add.layer();

        var print = this.add.text(0, 0, '').setDepth(1);
        var bg = this.add.image(400, 300, 'classroom')
            .setInteractive()
            .on('pointerup', function () {
                print.text += 'Click bottom image\n';
            })
        var testObj = this.rexUI.add.roundRectangle(200, 200, 100, 100, 20, 0xff0000);

        layer1.add([bg,print])
        layer2.add(testObj);


        var dialog = CreateDialog(this).setPosition(400, 300);

        this.rexUI.modalPromise( dialog, { manaulClose: true, duration: { in: 500, out: 500} })
            .then(function (result) {
                print.text += `Click button ${result.index}: ${result.text}\n`;
            })
        
        layer1.add(dialog);

    }

    update() { }
}

var CreateDialog = function (scene) {
    var dialog = scene.rexUI.add.dialog({
        background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0),
        title: scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x003c8f),
            text: scene.add.text(0, 0, 'Title', {
                fontSize: '24px'
            }),
            space: { left: 15, right: 15, top: 10, bottom: 10}
        }),
        content: scene.add.text(0, 0, 'Do you want to build a snow man?', {
            fontSize: '24px'
        }),
        actions: [
            CreateLabel(scene, 'Yes'),
            CreateLabel(scene, 'No')
        ],
        space: {
            title: 25, content: 25, action: 15,
            left: 20, right: 20, top: 20, bottom: 20,
        },
        align: {
            actions: 'right', // 'center'|'left'|'right'
        },
        expand: {
            content: false,  // Content is a pure text object
        }
    })
    .layout();

    dialog
        .on('button.click', function (button, groupName, index, pointer, event) {
            dialog.emit('modal.requestClose', { index: index, text: button.text });
        })
        .on('button.over', function (button, groupName, index, pointer, event) {
            button.getElement('background').setStrokeStyle(1, 0xffffff);
        })
        .on('button.out', function (button, groupName, index, pointer, event) {
            button.getElement('background').setStrokeStyle();
        });

    return dialog;
}

var CreateLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x5e92f3),
        text: scene.add.text(0, 0, text, {
            fontSize: '24px'
        }),
        space: { left: 10, right: 10, top: 10, bottom: 10}
    });
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1024,
    height: 800,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: [Test1]
};

var game = new Phaser.Game(config);