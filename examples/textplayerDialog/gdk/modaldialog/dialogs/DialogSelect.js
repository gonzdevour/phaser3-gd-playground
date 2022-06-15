import Style from "../../settings/Style";
import CreateRoundRectangleBackground from "../../templates/CreateRoundRectangleBackground";
import DialogDefault from "./DialogDefault";
import RegisterBehaviors from "../../behaviors/RegisterBehaviors";

//utils
import GetValue from "../../utils/object/GetValue";
import Shuffle from "../../utils/array/Shuffle";

var DialogSelect = function (scene, config) {
    var dialogConfig =  {
      name: 'DialogSelect',
      title: CreateTitle(scene, GetValue(config, 'title', undefined)),
      content: CreateContent(scene, GetValue(config, 'content', undefined)),
      choicesBackground: CreateRoundRectangleBackground(scene, 20, 0x110606, 0x663030, 6), //'#663030''#110606',
      choices: CreateChoices(scene, GetValue(config, 'choicesData', [])),
      choicesType: 'y-radio',
      choicesSetValueCallback: function (button, value) {
        if (value) {
            button.getElement('background').setFillStyle(0xff3333)
        } else {
            button.getElement('background').setFillStyle()
        }
      },
      background: CreateRoundRectangleBackground(scene, 20, 0x0, 0xffffff, 2),
      extraConfig: Object.assign({},{expand:{title:false,content:false,choices:true}},GetValue(config,'extraConfig',{}))
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
    return title?scene.rexUI.add.BBCodeText(0, 0, title, { fontFamily: Style.fontFamilyName, fontSize: 60 }):undefined;
}

var CreateContent = function(scene, content){
    return content?scene.rexUI.add.BBCodeText(0, 0, content, { fontFamily: Style.fontFamilyName, fontSize: 48 }):undefined;
}

var CreateButton = function (scene, config) {
    var label = scene.rexUI.add.label({
        background: config.background?config.background:undefined,
        icon: config.imageKey?scene.add.image(0, 0, config.imageKey).setDisplaySize(90, 90):undefined,
        text: config.text?scene.rexUI.add.BBCodeText(0, 0, config.text, config.textStyle?config.textStyle:{ fontFamily: Style.fontFamilyName, fontSize: 60 }):undefined,
        space: config.spaceSettings?config.spaceSettings:{},
    });
    //註冊pointer特效
    RegisterBehaviors(label, GetValue(config, 'behavior', []))
    //賦予按鈕類型
    label.type = GetValue(config, 'type', 'none');
    //此按鈕是否關閉dialog
    label.closeDialog = GetValue(config, 'closeDialog', false);
    //註冊callback
    if ( typeof(config.callback) === 'function' ){ 
        label.onClick(config.callback)
    }

    return label;
}

//choicesData:{ifShuffle:1/0, list:[{imgKey:key, text:text, indexFixed:0/1},...]}
var CreateChoices = function(scene, choicesData){
    var btnArrSizerd = [];//排好順序且包含rexUI space的button array
    var btnArrResult = [];//排好順序的button array
    
    var btnArrPre = [];         //未分類的選項群
    var btnArrPreShuffle = [];  //顯示位置不固定可shuffle的選項群
    var btnArrPreFixed = [];    //顯示位置須固定不shuffle的選項群

    var list = GetValue(choicesData, 'list', []);
    list.forEach(function(item, index, arr){ //建立選項按鈕群
        //button config
        item.spaceSettings = { left: 20, right: 20, top: 20, bottom: 20, icon: 10 };
        item.textStyle = { 
            fontFamily: Style.fontFamilyName,
            fontSize: 48,
            wrap: {
                mode: 'character', // 0|'none'|1|'word'|2|'char'|'character'
                width: scene.viewport.width*0.7,
            }
        }
        item.background = CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2);
        item.behavior = ['ninja'];
        item.closeDialog = true;
        var button = CreateButton(scene, item)
        //assign properties
        button.index = index;
        button.name = String(index+1); //等同於db中選項1234，以此判斷選了哪項

        btnArrPre.push(button); //未分類的選項群
        if (item.indexFixed == 1){
            btnArrPreFixed.push(button); //顯示位置不固定可shuffle的選項群
        } else {
            btnArrPreShuffle.push(button); //顯示位置須固定不shuffle的選項群
        }
    })

    if(choicesData.ifShuffle == 1){ //如果choiceData要整個shuffle，無視item.indexFixed設定直接shuffle
        Shuffle(btnArrPre);
        btnArrResult = btnArrPre.slice(); //排序完成後複製一份
    } else { //如果choiceData不要整個shuffle，依據item.indexFixed設定來shuffle
        Shuffle(btnArrPreShuffle);
        for (let i = 0; i < list.length; i++) { //以未分類選項群的索引為基準，將固定位置的選項排到該位置
            if (list[i].indexFixed == 1){
                btnArrResult.push(btnArrPre[i]);
            } else {
                var btn = btnArrPreShuffle.pop(); //其餘位置由可shuffle的選項群逐一填入
                btnArrResult.push(btn);
            }
        }
    }

    ////將排好順序的button array加入rexUI space後回傳給dialog使用
    btnArrSizerd.push(scene.rexUI.add.space());
    btnArrResult.forEach(function(item, index, arr){
        btnArrSizerd.push(item);
        btnArrSizerd.push(scene.rexUI.add.space());
    })

    return btnArrSizerd;
}

export default DialogSelect;