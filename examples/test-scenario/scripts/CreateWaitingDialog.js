//gdk
import { DialogSelect } from '../gdk/modaldialog/DialogType';
import { TransitionChoicesUpScaleDown } from '../gdk/modaldialog/TransistionType.js';
import { TransitionBT } from '../gdk/modaldialog/TransistionType.js';
import dialogButtonClickCallback from '../gdk/modaldialog/dialogButtonClickCallback.js';

//action before dialog close
import AutoRemoveTween from "../../../../phaser3-rex-notes/plugins/utils/tween/AutoRemoveTween";
import { Delay } from "../../../../phaser3-rex-notes/plugins/eventpromise";

//dialog與tagPlayer演出

var CreateWaitingDialog = async function(scene, choices, viewport){ //傳入viewport作為dialog加入vpc的目標viewport
    if (viewport == undefined){
        viewport = scene.viewport; //如果沒有viewport就以scaleOuter為viewport
    }
    var result = await DialogSelect(scene, {
        //title: 'test title', 
        //content: 'test content', 
        actions: [
            {imageKey:'no', text: '清空', type: 'clear', callback: undefined},
            {imageKey:'yes', text: '確定', type: 'confirm', callback: undefined, closeDialog:true},
        ],
        choicesData: {
            ifShuffle:0,
            list: CreateChoiceDataList(choices),
        },
        extraConfig: { //客製調整參數
            x: viewport.centerX,
            y: viewport.bottom,
            viewport: viewport,
            width: scene.game.config.width-50, 
            cover: {color:0x0, alpha: 0.3, transitIn(cover, dur){}, transitOut(cover, dur) {},}, //#663030
            transitIn: TransitionBT,
            transitOut: TransitionChoicesUpScaleDown,
            duration:{ in: 600, out: 600 },
            dialogButtonClickCallback: dialogButtonClickCallback, //通用流程處理後回傳result: buttonType, choicesState, singleSelectedName
            actionsBeforeDialogClose: actionsBeforeDialogClose, //點擊選項後面板收合前的客製反應；等待按鈕閃爍、角色表情動作、等待播放評語
        }
    })
    return result;
}
  
var CreateChoiceDataList = function(choices){
    var result = [];
    for (let index = 0; index < choices.length; index++) {
        var data = {
            imageKey: undefined,
            text: choices[index]['text'],
            indexFixed: 1,
        };
        result.push(data);
    }
    //console.log(JSON.stringify(result))
    return result;
}

//actionsBeforeDialogClose:
//點擊選項後面板收合前的客製反應；等待按鈕閃爍、角色表情動作、等待播放評語
//原本是獨立檔案，不拆出來是因為貼上比較簡單
//必須是async fucntion或promise

var actionsBeforeDialogClose = async function(scene, button, dialog, result){
    flash(button);
    await Delay(1000);
}
  
var flash = function(button){
    var bbg = button.getElement('background')
    AutoRemoveTween(bbg, {ease: 'linear', alpha: 0, duration: 200, yoyo: true, repeat:2,});
    AutoRemoveTween(button, {ease: 'cubic', y: '-=20', duration: 300, yoyo:true, completeDelay: 400});
}

export default CreateWaitingDialog;