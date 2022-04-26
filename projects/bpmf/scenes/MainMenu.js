import 'phaser';
import Base from './Base.js';
import { MainMenuSceneKey, QuizConfigSceneKey, QuizSceneKey, ResultSceneKey } from './Const.js';
import CreateMainMenuPanel from '../build/view/mainmenupanel/CreateMainMenuPanel.js';
import ModalDialogPromise from '../build/view/modeldialog/ModalDialogPromise.js';
import CreateSettingsPanel from '../build/view/mainmenupanel/CreateSettingsPanel.js';
import { Style } from '../build/view/style/style.js';

// Main menu
class MainMenu extends Base {
    constructor() {
        super({
            key: MainMenuSceneKey
        })

    }

    preload() {
    }

    create() {

        var _scene = this;
        super.scaleOuter(); //Base: this.rexScaleOuter.scale();

        _scene.log('Lang=' + this.language);

        var mainMenu = CreateMainMenuPanel(this);
        mainMenu
            .setMinSize(this.viewport.displayWidth, this.viewport.displayHeight)
            .layout()
        //    .drawBounds(this.add.graphics(), 0xff0000)
        //on button clicked事件宣告在build/view/mainmenupanel/CreateMainMenuPanel.js
        //on button clicked後emit以下事件：
            .on('button.mode-select', function () { //模式選擇
                this.transitionTo( QuizConfigSceneKey,500 );
            }, this)
            .on('button.continue', function () { //繼續遊戲
                this.transitionTo( QuizSceneKey,500 );
                //this.transitionTo( ResultSceneKey,500 );
            }, this)
            .on('button.config', function () { //todo
                _scene.model.sound.play(_scene, 'right');
                _scene.log('button.config')
                ModalDialogPromise(_scene, {
                    title: '系統設定',
                    content: CreateSettingsPanel(_scene),
                    buttonMode: 1,        
                    width: _scene.viewport.displayWidth-50,
                })
            }, this)
            .on('button.help', function () { //todo
                _scene.model.sound.play(_scene,'right');
                _scene.log('button.help')
                ModalDialogPromise(_scene, {
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
                    buttonMode: 3,
                    contentStyle:{ fontFamily: Style.fontFamilyName, fontSize: 40 },
                    callbackMail: function(){ _scene.model.browser.open('https://forms.gle/uc51sDPiUZ34Qiws9') },        
                    width: _scene.viewport.displayWidth-50,
                })
            }, this)

        //this.log(`${mainMenu.width}x${mainMenu.height}`)

        super.create(); //createSysPanel & setupTransition

    }

    update() { }
}

export default MainMenu;