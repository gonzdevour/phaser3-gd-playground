import { DefaultAppConfig } from "../settings/DefaultData";
import { DialogY } from "../gdk/modaldialog/DialogType";
import Style from "../settings/Style";

//date
import { DateTime, Duration, Interval } from "luxon";

const COLOR_PRIMARY = 0x999999;
const COLOR_LIGHT = 0x666666;
const COLOR_DARK = 0x333333;

var labelStyle = {

    background: {
        radius: 10,
        color: COLOR_DARK,
        'active.color': COLOR_PRIMARY,
        strokeWidth: 0,
        'hover.strokeColor': 0xffffff,
        'hover.strokeWidth': 2
    },
    icon: {
        key: 'ico_arrowL',
        'active.key': 'ico_yes',
        'hover.glowColor': 0xeeeeee,
    },
    iconSize:32,          
    text: {
        $type: 'text',
        fontSize: 32,
        testString: '|MÉqgy回',

        'active.fontStyle': 'bold',
        'active.color': 'black',
    },
    space: {
        left: 10, right: 10, top: 10, bottom: 10,
        icon: 10,
    },
}

var createButton = function (scene, style, text) {
    return scene.rexUI.add.simpleLabel(style)
        .resetDisplayContent({
            text: text,
            icon: true,
        })
        .setName(text);
}

var createButtons = function(scene){
    return scene.rexUI.add.buttons({
        width: 200,
        orientation: 'y',
        buttons: [
            createButton(scene, labelStyle, '返回'),
            createButton(scene, labelStyle, '播放'),
            createButton(scene, labelStyle, '停止'),
            createButton(scene, labelStyle, '就寢'),
        ],
        space: { left:16, top:16, item: 16, bottom: 16, },
        buttonsType: 'radio'
    })
        .layout()
        .on('button.statechange', function (button, index, value, previousValue) {
            button.setActiveState(value);
        })
        .on('button.over', function (button, index, pointer, event) {
            button.setHoverState(true);
        })
        .on('button.out', function (button, index, pointer, event) {
            button.setHoverState(false);
        })
        .changeOrigin(0,1)
        ._locate({
            layerName: "ui",
            vpx: 0,
            vpy: 1,
        })
}

var goToScene = function(scene, key, duration){
    duration = duration==undefined?1000:duration
    scene.transitionTo( key, duration);
    return scene;
}

var CreateMdsControlButtons = function(scene, mds){
  return createButtons(scene)
    .on('button.click', function (button, index, pointer, event) {
        switch (index) {
            case 0: //返回
            scene.game.audio.play(scene,'right');
            DialogY(scene, {
                title: `確定要返回標題畫面嗎？`,
                actions: [
                {imageKey:'ico_yes', type: 'confirm', callback: function(){goToScene(scene, DefaultAppConfig.sceneKey.Title)}, closeDialog:true},
                {imageKey:'ico_no', type: 'confirm', callback: undefined, closeDialog:true},
                ],
                buttonMode: 1, //是否手動manualClose      
                extraConfig: { //客製調整參數
                //layerName: "ui",
                viewport: scene.viewport,
                width: 600,
                duration:{ in: 200, out: 100 },
                titleStyle:{ fontFamily: Style.fontFamilyName, fontSize: 36 },
                space: {left:20, right:20, top:60, bottom:40},
            }
            })
            break;
            case 1: //播放
            mds.startGroup('歷史事件');
            break;
            case 2: //停止
            mds.stopGroup('歷史事件');
            break;
            case 3: //就寢
            var dt = DateTime.fromFormat(String(mds.getData('date')), "yyyyMMdd")
            var dtString = dt.plus({ days: 1 }).toFormat("yyyyMMdd");
            //console.log(dtString)
            mds.setData('date', Number(dtString))
            mds.startGroup('歷史事件');
            break;
        }
    },scene)
}

export default CreateMdsControlButtons;