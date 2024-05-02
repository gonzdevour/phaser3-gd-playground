//決定按下dialog中的任何按鈕會回傳什麼

var dialogButtonClickCallback = function (scene, dialog, button, groupName, index, config) {

  //如果按下了clear按鈕則使所有選中的選項還原
  if (button.type === 'clear'){
      dialog.clearChoicesButtonStates();
  }

  //檢查選項狀態並設定&回傳
  var result = stateCheck(dialog, button);

  //如果按下了會關閉dialog的按鈕則關閉dialog
  if (button.closeDialog === true){
    dialog.setAllButtonsEnable(false);
    closeDialog(scene, button, dialog, result, config);
  }
}

var closeDialog = async function(scene, button, dialog, result, config){
  if ( typeof(config.actionsBeforeDialogClose) === 'function' ){
    await config.actionsBeforeDialogClose(scene, button, dialog, result);
  }
  scene.rexUI.modalClose(dialog, result);
};

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