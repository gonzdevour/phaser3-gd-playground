import ModalDialogPromise from "../ModalDialogPromise";
import Style from "../../../../settings/Style";
import CreateRoundRectangleBackground from "../../style/CreateRoundRectangleBackground";

//utils
import GetValue from "../../../../../../plugins/utils/object/GetValue";

var DialogYN = function (scene, titleTxt, contentTxt, extraConfig) {

  //建立元件，可能需要考慮style，所以傳入extraConfig控制
  var objectConfig = {
    title: CreateTitle(scene, titleTxt, extraConfig),
    content: CreateContent(scene, contentTxt, extraConfig),
    choices: undefined,
    actions: CreateAction(scene, extraConfig),
    background: CreateRoundRectangleBackground(scene, 20, 0x0, 0xffffff, 2),
  }

  //通用預設值
  var valueConfig = {
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
    buttonMode: 1, //modalClose的模式選擇
  }

  //如果extraConfig有值則對dialogConfig覆蓋原值或加入新值
  var dialogConfig = Object.assign({}, objectConfig, valueConfig, extraConfig);

  return ModalDialogPromise(scene, dialogConfig)
}

//客製函數

var CreateTitle = function(scene, title, config){
    var titleStyle = GetValue(config, 'titleStyle', { fontFamily: Style.fontFamilyName, fontSize: 60 });
    return scene.rexUI.add.BBCodeText(0, 0, title, titleStyle);
}

var CreateContent = function(scene, content,config){
    var contentStyle = GetValue(config, 'contentStyle', { fontFamily: Style.fontFamilyName, fontSize: 48 });
    return scene.rexUI.add.BBCodeText(0, 0, content, contentStyle);
}

var CreateAction = function(scene, config){
    var callbacks = GetValue(config, 'callbacks', undefined);
    var actions = [
        CreateButton(scene, 'yes').onClick(callbacks[0]),//yes
        scene.rexUI.add.space(),
        CreateButton(scene, 'no').onClick(callbacks[1]),//no
    ];
    return actions;
}

var CreateButton = function (scene, img, txt, spaceSettings, bg) {
    var label = scene.rexUI.add.label({
        background: bg?bg:undefined,
        //icon: scene.rexUI.add.roundRectangle(0, 0, 90, 90, 20, undefined).setStrokeStyle(2, 0x00ff00),
        icon: img?scene.add.image(0, 0, img).setDisplaySize(90, 90):undefined,
        text: txt?scene.rexUI.add.BBCodeText(0, 0, txt, { fontFamily: Style.fontFamilyName, fontSize: 60 }):undefined,
        space: spaceSettings?spaceSettings:{},
    });
    return label;
}


export default DialogYN;