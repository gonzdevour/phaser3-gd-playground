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
        })
        .on('modal.open', function(modalBehavior){
            dialog.broadcastEvent('dialog.open', scene);
        })
        .on('modal.close', function(closeEventData, modalBehavior){
            dialog.broadcastEvent('dialog.close', scene);
        })

    config.manualClose = (config.buttonMode !== 0); //是否手動關閉，預設為true，可由CreateModalDialog設定manualClose來控制
    config.transitIn = 0;  //0('popUp')|1('fadeIn')|false(null)|customCallback(obj,dur)
    //config.transitOut = 0; //0('scaleDown')|1('fadeOut')|false(null)|customCallback(obj,dur)
    config.transitOut = function(dialog, duration) {
        //取出dialog中被選中的buttons
        var selectedButtons = [];
        var choicesState = dialog.getChoicesButtonStates();
        var idx = 0;
        for (var name in choicesState) {
            if (choicesState[name] === true){
                selectedButtons.push(dialog.getChoice(idx))
            }
            idx++;
        }
        //取出被選中的buttons的backgrounds
        var selectedBgs = [];
        selectedButtons.forEach(function(item, idx, arr){
            selectedBgs.push(item.getElement('background'));
        })
        //依序執行tween
        scene.tweens.add({targets: selectedBgs, ease: 'Linear', alpha: 0, duration: 300, yoyo: true, repeat:-1,})
        scene.tweens.timeline({
            tweens: [
                { targets: selectedButtons, ease: 'Linear', y: '-=20', duration: 1000,},
                { targets: dialog, ease: 'Cubic', scale: 0, duration: 400,},
            ]

        });
    }
    config.duration = { //如果刪除會使用預設值
        in: 200,
        hold: 2000, //自動關閉前的持續時間，manualClose為true時會disable這個數值
        out: 1400
    };
    //scene.drawBounds(dialog);

    //將dialog再包裝為modal，並建立promise
    return scene.rexUI.modalPromise(dialog, config);
}

export default ModalDialogPromise;