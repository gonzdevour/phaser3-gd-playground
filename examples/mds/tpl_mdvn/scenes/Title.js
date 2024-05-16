import Base from './Base.js';
import initMasterScene from '../gdk/scene/InitMasterScene.js';

import { DefaultAppConfig } from '../settings/DefaultData.js';
import { DefaultData } from '../settings/DefaultData.js';
import Style from '../gdk/settings/Style.js';

import CreateSettingsPanel from '../gdk/templates/CreateSettingsPanel.js';
import CreateTitleLabel from '../gdk/templates/CreateTitleLabel.js';
import CreateGridLoadPanel from '../gdk/templates/LoadPanel/CreateGridLoadPanel.js';
import { DialogY } from '../gdk/modaldialog/DialogType.js';
import { TransitionScaleUpTitleUP } from '../gdk/modaldialog/TransistionType.js';

import OnWindowResize from 'gdkPlugins/utils/rwd/OnWindowResize.js'

import CreateTitle from '../scripts/CreateTitle.js';

//Title
class Title extends Base {
    constructor() {
        super({
            key: DefaultAppConfig.sceneKey.Title
        })
    }
    init(){
        initMasterScene(this);
    }
    create() {
        var scene = this;
        var viewport = this.viewport;

        console.log('title init')
        scene.log(`appLang: ${DefaultData.appLang} (${DefaultData.appLangAlias})`);

        var mainMenu = CreateTitle(this);

        //rwd
        var response = function(){
            scene.add.image(viewport.centerX, viewport.centerY, "__MISSING")
            console.log("vpcenterX:" + viewport.centerX)
            mainMenu
                .setPosition(viewport.centerX, viewport.centerY)
                .setMinSize(viewport.width, viewport.height)
                .layout()
        }
        OnWindowResize(scene, response,mainMenu);

        scene.input.on("pointerdown", function(){
            console.log("relayout")
            viewport = scene.scale.getViewPort();
            mainMenu
                .setPosition(viewport.centerX, viewport.centerY)
                .setMinSize(viewport.width, viewport.height)
                .layout()
        },scene)

        mainMenu
            .setMinSize(viewport.width, viewport.height) //displayWidth, displayHeight則不受scaleOuter影響
            .layout()
            // .on('button.mode-select', function () { //模式選擇
            //     this.transitionTo( QuizConfigSceneKey,500 );
            // }, this)
            // .on('button.continue', function () { //繼續遊戲
            //     this.transitionTo( QuizSceneKey,500 );
            // }, this)
            .on('buttonsMain.click', function(button, index, pointer, event){
                switch (index) {
                    case 0: //繼續遊戲
                    console.log(`0 clicked`)
                    break;
                    case 1: //重新開始
                    scene.transitionTo( DefaultAppConfig.sceneKey.Home,1000 );
                    break;
                    case 2: //讀取進度
                    DialogY(scene, {
                        title: CreateTitleLabel(scene, '冒險之書', '選擇讀檔欄位'),//.setAlpha(0), //在transitionIn中才visible以避免閃爍問題
                        content: CreateGridLoadPanel(this, 30),//.setAlpha(0),
                        actions: [
                          {imageKey:'ico_no', text: '關閉', type: 'cancel', callback: undefined, closeDialog:true},
                        ],
                        buttonMode: 1, //是否手動manualClose      
                        extraConfig: { //客製調整參數
                          viewport: viewport,
                          width: viewport.width-50,
                          transitIn: TransitionScaleUpTitleUP, //titleLabel專用轉場
                          duration:{ in: 100, out: 100 },
                          align: {title: 'left'}, //讓dialog title靠左
                          expand: {title: true, content:false}, //讓dialog title的background延展
                      }
                    })
                    break;
                }
            }, this)
            .on('button.config', function () { //todo
                scene.game.audio.play(scene, 'right');
                scene.log('button.config')
                DialogY(scene, {
                    title: '系統設定',
                    content: CreateSettingsPanel(scene),
                    actions: [
                        {imageKey:'ico_yes', type: 'confirm', callback: undefined, closeDialog:true},
                        //{imageKey:'ico_no', text: '取消', type: 'confirm', callback: undefined, closeDialog:true},
                      ],
                    buttonMode: 1,        
                    extraConfig: { //客製調整參數
                        viewport: viewport,
                        width: viewport.width-50,
                        expand:{
                            content: true, //讓panel隨Dialog的size延展
                        },
                        duration:{ in: 200, out: 100 },
                    }
                })
            }, this)
            .on('button.help', function () { //todo
                scene.game.audio.play(scene,'right');
                scene.log('button.help')
                DialogY(scene, {
                    title: '使用說明',
                    content: 
`「注音習作」是以注音符號測驗
認識常用字詞的線上教具APP，
有語音輔助，能指定易混淆的聲韻
進行強化訓練。適合幼小銜接以及
國語初學者使用。

尊重考證、遵循教育部指引為本作
一貫的開發原則。然而，字音形古
今通塞、南北是非，所謂「正確答
案」只存在一時一地，台灣本地習
慣的發音若與部頒標準不一致時，
本作則採兼容之立場，祈使用者透
過練習，可更貼合日常實用。

如有設計不周、內容錯漏，或有任
何相關的建議與指導，請不吝聯絡
敝團隊。

©PLAYONE 2022`,
                    actions: [
                      {imageKey:'ico_yes', type: 'confirm', callback: undefined, closeDialog:true},
                      //{imageKey:'ico_no', text: '取消', type: 'confirm', callback: undefined, closeDialog:true},
                    ],
                    buttonMode: 1, //是否手動manualClose      
                    extraConfig: { //客製調整參數
                      viewport: viewport,
                      width: viewport.width-50,
                      duration:{ in: 200, out: 100 },
                      contentStyle:{ fontFamily: Style.fontFamilyName, fontSize: 40 },
                  }
                })
            })
    }
}

export default Title;