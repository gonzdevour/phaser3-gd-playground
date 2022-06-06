import ModalDialogPromise from "../ModalDialogPromise";
import Style from "../../../../settings/Style";
import CreateRoundRectangleBackground from "../../style/CreateRoundRectangleBackground";

//utils
import Shuffle from "../../../../../../plugins/utils/array/Shuffle";

var DialogSelect = function (scene, titleTxt, contentTxt, config) {
  return ModalDialogPromise(scene, {
      title: CreateTitle(scene, titleTxt),
      content: CreateContent(scene, contentTxt),
      choicesBackground: CreateRoundRectangleBackground(scene, 20, 0x110606, 0x663030, 6), //'#663030''#110606'
      choices: CreateButtons(scene, config.buttonsData),
      actions: CreateAction(scene),
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

var CreateAction = function(scene){
    var actions = [
        scene.rexUI.add.space(),
        scene.rexUI.add.space()
        ]
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

//buttonsData:{ifShuffle:1/0, list:[{imgKey:key, text:text, indexFixed:0/1},...]}
var CreateButtons = function(scene, buttonsData){
    var btnArrSizerd = [];
    var btnArrResult = [];
    
    var btnArrPre = [];
    var btnArrPreShuffle = [];
    var btnArrPreFixed = [];
    var list = buttonsData.list;
    list.forEach(function(item, index, arr){
        item.space = { left: 20, right: 20, top: 20, bottom: 20, icon: 10 };
        item.bg = CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2)
        var button = CreateButton(scene, item.imgKey, item.text, item.space, item.bg)
        button.index = index;

        btnArrPre.push(button);
        if (item.indexFixed == 1){
            btnArrPreFixed.push(button); //不shuffle的選項
        } else {
            btnArrPreShuffle.push(button); //要shuffle的選項
        }
    })

    if(buttonsData.ifShuffle == 1){
        Shuffle(btnArrPre);
        btnArrResult = btnArrPre.slice();
    } else {
        Shuffle(btnArrPreShuffle);
        for (let i = 0; i < list.length; i++) {
            if (list[i].indexFixed == 1){
                btnArrResult.push(btnArrPre[i]);
            } else {
                var btn = btnArrPreShuffle.pop();
                btnArrResult.push(btn);
            }
        }
    }

    btnArrSizerd.push(scene.rexUI.add.space());
    btnArrResult.forEach(function(item, index, arr){
        btnArrSizerd.push(item);
        btnArrSizerd.push(scene.rexUI.add.space());
    })

    return btnArrSizerd;
}

export default DialogSelect;