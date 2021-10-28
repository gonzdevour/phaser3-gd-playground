import CreateModalDialog from './CreateModalDialog.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var ModalDialogPromise = function (scene, config) {
    var dialog = CreateModalDialog(scene, config);
    dialog.on('button.click', function (button, groupName, index, pointer, event) {
        dialog.emit('modal.requestClose', { index: index });
    })

    var buttonMode = GetValue(config, 'buttonMode', 0);
    config.manualClose = (buttonMode !== 0);
    config.anyTouchClose = (buttonMode === 0);

    return scene.rexUI.modalPromise(dialog, config);
}

export default ModalDialogPromise;