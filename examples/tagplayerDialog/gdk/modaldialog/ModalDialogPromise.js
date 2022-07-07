import CreateModalDialog from './CreateModalDialog.js';

var ModalDialogPromise = function (scene, config) {
    var dialog = CreateModalDialog(scene, config)
        .layout()
        .on('button.click', function (button, groupName, index, pointer, event){
            if ( typeof(config.dialogButtonClickCallback) === 'function' ){
                //指定callback
                config.dialogButtonClickCallback(scene, dialog, button, groupName, index);
            } else {
                //通用callback
                var choicesState = dialog.getChoicesButtonStates();
                if (button.closeDialog === true){
                    scene.rexUI.modalClose(dialog, { 
                        buttonType: button.type,
                        choicesState: choicesState,
                    });
                }
            }
            if (button.closeDialog === true){
                //停用button input
                dialog.setAllButtonsEnable(false);
            }
        })
        .on('modal.open', function(modalBehavior){
            dialog.broadcastEvent('dialog.open', scene);
        })
        .on('modal.close', function(closeEventData, modalBehavior){
            dialog.broadcastEvent('dialog.close', scene);
        })

    //將dialog再包裝為modal，並建立promise
    return scene.rexUI.modalPromise(dialog, config);
}

export default ModalDialogPromise;