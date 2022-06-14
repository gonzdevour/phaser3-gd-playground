import CreateModalDialog from './CreateModalDialog.js';

/*
QuizResultModalPromise: 
    return ModalDialogPromise(scene, {
        content: characterUI,
    })
*/
var ModalDialogPromise = function (scene, config) {
    var dialog = CreateModalDialog(scene, config)
        .layout()
        .on('button.click', function (button, groupName, index, pointer, event){
            if ( typeof(config.dialogButtonClickCallback) === 'function' ){
                config.dialogButtonClickCallback(scene, dialog, button, groupName, index);
            } else {
                // To invoke modal.requestClose(result)
                //modalPromise會把dialog用modal behavior再包裝過，掛上dialog.on('modal.requestClose', modal.requestClose(result))
                //※emit的規則：必須同一物件收發，ee.emit → ee.on
                //https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/behaviors/modal/ModalPromise.js#L15
                //原本這裡的寫法是dialog.emit('modal.requestClose', { index: index });
                //用scene.rexUI.modalClose把上面的dialog.emit包成直屬rexUI的函數
                //https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/behaviors/modal/ModalPromise.js#L32
                var choicesState = dialog.getChoicesButtonStates();
                if (button.closeDialog === true){
                    scene.rexUI.modalClose(dialog, { 
                        buttonType: button.type,
                        choicesState: choicesState,
                    });
                }
            }
        })
        .on('modal.open', function(modalBehavior){
            dialog.broadcastEvent('dialog.open', scene);
        })
        .on('modal.close', function(closeEventData, modalBehavior){
            dialog.broadcastEvent('dialog.close', scene);
        })

    config.manualClose = (config.buttonMode !== 0); //是否手動關閉，預設為true，可由CreateModalDialog設定manualClose來控制
    config.transitionIn = 0;  //0('popUp')|1('fadeIn')|false(null)|customCallback(obj,dur)
    config.transitionOut = 0; //0('scaleDown')|1('fadeOut')|false(null)|customCallback(obj,dur)
    config.duration = { //如果刪除會使用預設值
        in: 200,
        hold: 2000, //自動關閉前的持續時間，manualClose為true時會disable這個數值
        out: 200
    };
    //scene.drawBounds(dialog);

    //將dialog再包裝為modal，並建立promise
    return scene.rexUI.modalPromise(dialog, config);
}

export default ModalDialogPromise;