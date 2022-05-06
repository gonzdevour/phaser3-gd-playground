import 'phaser';
import PenddingMessages from '../../plugins/pendding-messages/PenddingMessages.js';
import UIPlugin from '../../../phaser3-rex-notes/templates/ui/ui-plugin.js';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })
    }


    preload() {
    }

    create() {
        var messages = new PenddingMessages();
        messages.on('update', function () {
            console.log(JSON.stringify(messages));
        })

        messages.push('Message 0').push('Message 1').push('Message 2');

        // messages.pop(PopCallback, this);
        messages.popAll(PopCallback, this)
            .then(function (result) {
                debugger
            })

        messages.push('Message 3').push('Message 4')

    }

    update() {

    }
}

var PopCallback = async function (message) {
    var result = await this.rexUI.modalPromise(
        // Game object
        CreateDialog(this, message).setPosition(400, 300),
        // Config
        {
            manaulClose: true,
            duration: {
                in: 500,
                out: 500
            }
        }
    )
    return (result.index === 0);
}

var CreateDialog = function (scene, content) {
    var dialog = scene.rexUI.add.dialog({
        width: 600,
        background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0),

        title: scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x003c8f),
            text: scene.add.text(0, 0, 'Title', {
                fontSize: '24px'
            }),
            space: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 10
            }
        }),

        content: scene.add.text(0, 0, content, {
            fontSize: '24px'
        }),

        actions: [
            CreateLabel(scene, 'Yes'),
            CreateLabel(scene, 'No')
        ],

        space: {
            title: 25,
            content: 25,
            action: 15,

            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
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
        // width: 40,
        // height: 40,

        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x5e92f3),

        text: scene.add.text(0, 0, text, {
            fontSize: '24px'
        }),

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        }
    });
}
var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Test,
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);