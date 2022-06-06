import ModalDialogPromise from "../ModalDialogPromise";
import Style from "../../../../settings/Style";
import CreateRoundRectangleBackground from "../../style/CreateRoundRectangleBackground";

var DialogFatal = function (scene, titleTxt, contentTxt, config) {
  return ModalDialogPromise(scene, {
      title: CreateTitle(scene, titleTxt),
      content: CreateContent(scene, contentTxt),
      choices: undefined,
      actions: [],//不給按鈕，無法關閉
      background: CreateRoundRectangleBackground(scene, 20, 0x0, 0xffffff, 2),
      //通用預設值
      width: scene.viewport.displayWidth-50,
      x: scene.viewport.centerX,
      y: scene.viewport.centerY,
      space: { 
          left: 40, 
          right: 40, 
          top: 40, 
          bottom: 40, 
          item: 40, 
          choices: 0, //跟action的間距
          choicesLeft: 0,
          choicesRight: 0,
          choicesBackgroundTop: 10,
          choicesBackgroundBottom: 10,
          choicesBackgroundLeft: 20,
          choicesBackgroundRight: 20,
          choice: 15,
      },
      expand:{
          title: false, //不隨dialog的排版延展
          content: false,
          choices: true,
      },
      //modalClose的模式選擇
      buttonMode: 1,
  })
}

//客製函數

var CreateTitle = function(scene, title){
    return scene.rexUI.add.BBCodeText(0, 0, title, { fontFamily: Style.fontFamilyName, fontSize: 60 });
}

var CreateContent = function(scene, content){
    return scene.rexUI.add.BBCodeText(0, 0, content, { fontFamily: Style.fontFamilyName, fontSize: 48 });
}

export default DialogFatal;