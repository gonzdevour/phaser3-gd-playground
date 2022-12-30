import CreateModalDialog from './CreateModalDialog.js';

var ModalDialogPromise = function (scene, config) {
    var dialog = CreateModalDialog(scene, config)
        .layout()
        .on('button.click', function (button, groupName, index, pointer, event){
            if ( typeof(config.dialogButtonClickCallback) === 'function' ){
                //指定callback
                config.dialogButtonClickCallback(scene, dialog, button, groupName, index, config);
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

    if(config.viewport){
        dialog.viewport = config.viewport;
        scene.vpc.add(dialog, dialog.viewport);
    }

    return scene.rexUI.modalPromise(dialog, config);
}

export default ModalDialogPromise;