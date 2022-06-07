import Style from "../../../../settings/Style";
import CreateRoundRectangleBackground from "../../style/CreateRoundRectangleBackground";
import DialogDefault from "./DialogDefault";

//utils
import GetValue from "../../../../../../plugins/utils/object/GetValue";
import Shuffle from "../../../../../../plugins/utils/array/Shuffle";

var DialogSelect = function (scene, config) {
    var dialogConfig =  {
      title: CreateTitle(scene, GetValue(config, 'title', '')),
      content: CreateContent(scene, GetValue(config, 'content', '')),
      choicesBackground: CreateRoundRectangleBackground(scene, 20, 0x110606, 0x663030, 6), //'#663030''#110606',
      choices: CreateButtons(scene, GetValue(config, 'choicesData', [])),
      background: CreateRoundRectangleBackground(scene, 20, 0x0, 0xffffff, 2),
      extraConfig: { 
          expand: { title: false, content: false, choices: true },
      }
    }
    addBehaviors(dialogConfig.choices, ['ninja']);
  
    return DialogDefault(scene, dialogConfig);
}

var addBehaviors = function(targets, bhvs){
    targets.forEach(function(target, idx, arr){
        var originalBehaviors = GetValue(target, 'behavior', []);
        if(Array.isArray(originalBehaviors)){
            target.behavior = originalBehaviors.concat(bhvs);
        }
    })
    return targets;
}

//客製函數

var CreateTitle = function(scene, title){
    return scene.rexUI.add.BBCodeText(0, 0, title, { fontFamily: Style.fontFamilyName, fontSize: 60 });
}

var CreateContent = function(scene, content){
    return scene.rexUI.add.BBCodeText(0, 0, content, { fontFamily: Style.fontFamilyName, fontSize: 48 });
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

//choicesData:{ifShuffle:1/0, list:[{imgKey:key, text:text, indexFixed:0/1},...]}
var CreateButtons = function(scene, choicesData){
    var btnArrSizerd = [];
    var btnArrResult = [];
    
    var btnArrPre = [];
    var btnArrPreShuffle = [];
    var btnArrPreFixed = [];
    var list = choicesData.list;
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

    if(choicesData.ifShuffle == 1){
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