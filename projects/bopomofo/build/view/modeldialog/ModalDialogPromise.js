import CreateModalDialog from './CreateModalDialog.js';

var ModalDialogPromise = function (scene, config) {
    var dialog = CreateModalDialog(scene, config)
        .layout()
        .on('button.click', function (button, groupName, index, pointer, event) {
            scene.rexUI.modalClose(dialog, { index: index });
        })

    config.manualClose = (config.buttonMode !== 0);

    return scene.rexUI.modalPromise(dialog, config);
}

export default ModalDialogPromise;