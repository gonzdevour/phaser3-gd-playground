import Base from './Base.js';
import initMasterScene from '../gdk/scene/InitMasterScene.js';
import { DefaultAppConfig } from '../settings/DefaultData.js';
import Style from '../gdk/settings/Style.js';
//dialog
import { DialogY } from '../gdk/modaldialog/DialogType.js';
//mdvn
import MarkdownVisualNovel from 'rexnote/templates/markdownvisualnovel/MarkdownVisualNovel.js';
import TextBoxStyle from '../gdk/mds/mdvn/styles/TextBoxStyle.js';
import ChoiceStyle from '../gdk/mds/mdvn/styles/ChoiceStyle.js';
//GAS
import GetDocsFromGoogleDriveFolder from 'gdkPlugins/utils/gas/GetDocsFromGoogleDriveFolder.js';

class Home extends Base {
    constructor() {
        super({
            key: DefaultAppConfig.sceneKey.Home
        })
    }
    init(){
        initMasterScene(this);
    }
    preload(){
        this.load.text('sheet0', 'assets/mds/sample.md')
    }
    create() {
        var scene = this;
        var viewport = scene.viewport

        //var sheet0 = scene.cache.text.get('sheet0');
        var sheet = {};
        var mvdnLayer = scene.layerManager.getLayer('scenario_story');
        var mds = new MarkdownVisualNovel(scene, {
            styles: {
                TEXTBOX: TextBoxStyle,
                CHOICE: ChoiceStyle,
            },
            rootLayer: mvdnLayer, //指定mdvn使用的root layer
            viewport, //指定viewport讓vpx,vpy,vpw,vph起作用
        })
        .on('pause.input', function () {
            console.log('pause.input //Wait any click to continue');
        })
        .on('resume.input', function () {
            console.log('resume.input');
        })
        .on('complete', function () {
            console.log('complete //以下印出memory');
            console.log(mds.memory)
        })
        .setData('$typingSpeed',50)
        .setData('$transitionDuration',0) //BG.cross, SPRITE.cross
        .setData('$tintOthers',0x333333) //SPRITE.focus
        .setData('vpw',viewport.width)
        .setData('choiceWidth',viewport.portrait?viewport.width*0.8:viewport.width*0.5)
        .setData('name', 'rex')
        .setData('coin', 1)
        .setData('hp', 4)

        GetDocsFromGoogleDriveFolder({
            folderId: "1Lnj1LAug-aZCGiOvjhwZ-JABuqa-XYgg",
            url: "https://script.google.com/macros/s/AKfycbzWebO96vZCKbVUL0dMemnZm852WgyzYtT8zzlMKFzik5IT7rsFKBA8_sUf51NiMoyoHA/exec",
        }).then(data => {
            console.log('Received data:\n', data);
            var arr = JSON.parse(data);
            arr.forEach(element => {
                sheet[element.scriptName] = element.content;
                mds.addEventSheet(sheet[element.scriptName], element.groupName)
            });
            mds.startGroup('歷史事件');
            buttons.setAlpha(1);
        }).catch(error => {
            console.error('Error during gasReq call:\n', error);
        });  

        var buttons = createButtons(scene).setAlpha(0);
        buttons.on('button.click', function (button, index, pointer, event) {
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
                      viewport: viewport,
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
            }
        },scene)
    }
}

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

var createButtons = function (scene) {
    return scene.rexUI.add.buttons({
        width: 200,
        orientation: 'y',
        buttons: [
            createButton(scene, labelStyle, '返回'),
            createButton(scene, labelStyle, '播放'),
            createButton(scene, labelStyle, '停止'),
            createButton(scene, labelStyle, 'DDD'),
        ],
        space: { left:16, top:16, item: 16 },
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
        .changeOrigin(0,0)
        ._LocateVPC(0,0)
}

var createStatPanel = function (scene, style, text) {
    return scene.rexUI.add.simpleLabel(style)
        .resetDisplayContent({
            text: text,
            icon: true,
        })
        .setName(text);
}

var goToScene = function(scene, key, duration){
    duration = duration==undefined?1000:duration
    scene.transitionTo( key, duration);
    return scene;
}

export default Home;