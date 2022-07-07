import GetValue from "../../../../plugins/utils/object/GetValue";
import AutoRemoveTween from "../../../../../phaser3-rex-notes/plugins/utils/tween/AutoRemoveTween";
import { Delay } from "../../../../../phaser3-rex-notes/plugins/eventpromise";
import { WaitEvent } from "../../../../../phaser3-rex-notes/plugins/eventpromise";

//決定按下dialog中的任何按鈕會回傳什麼

var dialogButtonClickCallback = function (scene, dialog, button, groupName, index) {

  //如果按下了clear按鈕則使所有選中的選項還原
  if (button.type === 'clear'){
      dialog.clearChoicesButtonStates();
  }

  //檢查選項狀態並設定&回傳
  var result = stateCheck(dialog, button);

  //如果按下了會關閉dialog的按鈕則關閉dialog
  if (button.closeDialog === true){
    dialog.setAllButtonsEnable(false);
    flash(button);
    closeDialog(scene, dialog, result);
  }
}

var closeDialog = async function(scene, dialog, result){
  await Delay(1000);
  var textPlayer = scene.textPlayer;
  textPlayer.character.timeScale = 1.5;
  textPlayer.character.setExpression('F06').stopAllMotions().startMotion('TapBody', 0, 'force')
  await textPlayer.playPromise(textPlayer.question['Say' + GetValue(result, 'singleSelectedName', 1) ]+'[wait=500]')
  //中途加入nextQbutton的兩個方法：
  //方法1:
  // var btnNext = scene.rexUI.add.label({x:200, y:200, icon:scene.add.image(0,0,'yes')})
    // .setInteractive()
    // .layout()
  // await WaitEvent(btnNext, 'pointerup');
  //方法2:
  // var btnNext = scene.rexUI.add.label({x:200, y:200, icon:scene.add.image(0,0,'yes')})
  //   .onClick(function(button, gameObject){gameObject.emit('clicked')})
  //   .layout()
  // await WaitEvent(btnNext, 'clicked');
  scene.rexUI.modalClose(dialog, result);
}

var flash = function(button){
  var bbg = button.getElement('background')
  AutoRemoveTween(bbg, {ease: 'linear', alpha: 0, duration: 200, yoyo: true, repeat:2,});
  AutoRemoveTween(button, {ease: 'cubic', y: '-=20', duration: 300, yoyo:true, completeDelay: 400});
}

var stateCheck = function(dialog, button){

  //如果有actions的話，依按鈕類型賦予名稱以便指定
  var btn = {};
  var actions = dialog.getElement('actions');
  if (actions){
    actions.forEach(function(act, idx, arr){
      btn[act.type] = act; //btn['confirm'|'clear']
  })
  }

  //取得選項狀態
  var choicesState = dialog.getChoicesButtonStates();

  //計算被選中的選項數量，並設定最後一個為真的choice name為singleSelectedName以供回傳
  var singleSelectedName = undefined;
  var choicesTrueCnt = 0
  for (var name in choicesState) {
      if (choicesState[name] === true){
          choicesTrueCnt++;
          singleSelectedName = name;
      }
  }

  //如果有選
  // if (choicesTrueCnt > 0){
  //     if (btn['clear']){
  //         btn['clear'].show(); //顯示clear按鈕
  //     }
  // } else {
  //     if (btn['clear']){
  //         btn['clear'].hide(); //隱藏clear按鈕
  //     } 
  // }

  var result = { 
    buttonType: button.type,
    choicesState: choicesState,
    singleSelectedName: singleSelectedName,
  }

  return result;
}


export default dialogButtonClickCallback;