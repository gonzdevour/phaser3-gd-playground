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
        .on('button.click', config.dialogButtonClickCallback)
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