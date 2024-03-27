import Base from './Base.js';
import initMasterScene from '../gdk/scene/InitMasterScene.js';
import { DefaultAppConfig } from '../settings/DefaultData.js';
import { DefaultData } from '../settings/DefaultData.js';

import Style from '../settings/Style.js';
import CreateTitle from '../scripts/CreateTitle.js';
import { DialogY } from '../gdk/modaldialog/DialogType.js';
//import CreateSettingsPanel from '../build/view/mainmenupanel/CreateSettingsPanel.js';

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
        mainMenu
            .setMinSize(viewport.displayWidth, viewport.displayHeight)
            .layout()
            // .on('button.mode-select', function () { //模式選擇
            //     this.transitionTo( QuizConfigSceneKey,500 );
            // }, this)
            // .on('button.continue', function () { //繼續遊戲
            //     this.transitionTo( QuizSceneKey,500 );
            // }, this)
            // .on('button.config', function () { //todo
            //     scene.model.sound.play(scene, 'right');
            //     scene.log('button.config')
            //     ModalDialogPromise(scene, {
            //         title: '系統設定',
            //         content: CreateSettingsPanel(scene),
            //         buttonMode: 1,        
            //         width: scene.viewport.displayWidth-50,
            //     })
            // }, this)
            .on('button.help', function () { //todo
                scene.audio.play(scene,'right');
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
                      {imageKey:'ico_yes', text: '確定', type: 'confirm', callback: undefined, closeDialog:true},
                      {imageKey:'ico_yes', text: '確定', type: 'confirm', callback: undefined, closeDialog:true},
                    ],
                    buttonMode: 1, //是否手動manualClose      
                    extraConfig: { //客製調整參數
                      viewport: viewport,
                      width: viewport.width-50,
                      duration:{ in: 600, out: 300 },
                      contentStyle:{ fontFamily: Style.fontFamilyName, fontSize: 40 },
                  }
                })
//                 ModalDialogPromise(scene, {
//                     title: '使用說明',
//                     content: 
// `「注音習作」是以注音符號測驗
// 認識常用字詞的線上教具APP，
// 有語音輔助，能指定易混淆的聲韻
// 進行強化訓練。適合幼小銜接以及
// 國語初學者使用。

// 尊重考證、遵循教育部指引為本作
// 一貫的開發原則。然而，字音形古
// 今通塞、南北是非，所謂「正確答
// 案」只存在一時一地，台灣本地習
// 慣的發音若與部頒標準不一致時，
// 本作則採兼容之立場，祈使用者透
// 過練習，可更貼合日常實用。

// 如有設計不周、內容錯漏，或有任
// 何相關的建議與指導，請不吝聯絡
// 敝團隊。

// ©PLAYONE 2022`,
//                     buttonMode: 3,
//                     contentStyle:{ fontFamily: Style.fontFamilyName, fontSize: 40 },
//                     callbackMail: function(){ scene.model.browser.open('https://forms.gle/uc51sDPiUZ34Qiws9') },        
//                     width: scene.viewport.displayWidth-50,
//                 })
            })
    }
}

export default Title;