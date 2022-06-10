import 'phaser';
import Base from './Base.js';
import * as SceneKey from '../settings/SceneKey.js';
import CreateMainMenuPanel from '../build/view/mainmenupanel/CreateMainMenuPanel.js';
import DialogDefault from '../build/view/modaldialog/dialogs/DialogDefault.js';
import { DialogY } from '../build/view/modaldialog/DialogType.js';
import CreateSettingsPanel from '../build/view/mainmenupanel/CreateSettingsPanel.js';
import Style from '../settings/Style.js';

//utils
import idGen from '../../../plugins/utils/id/idGen.js';

//Home
class Home extends Base {
    constructor() {
        super({
            key: SceneKey.Home
        })

    }

    preload() {
    }

    create() {

        var _scene = this;
        super.scaleOuter(); //Base: this.rexScaleOuter.scale();

        var mainMenu = CreateMainMenuPanel(this);
        mainMenu
            .setMinSize(this.viewport.displayWidth, this.viewport.displayHeight)
            .layout()
        //    .drawBounds(this.add.graphics(), 0xff0000)
        //on button clicked事件宣告在build/view/mainmenupanel/CreateMainMenuPanel.js
        //on button clicked後emit以下事件：
            .on('button.mode-select', function () { //模式選擇
                this.transitionTo( SceneKey.Menu,500 );
            }, this)
            .on('button.continue', function () { //繼續遊戲
                this.transitionTo( SceneKey.Game,500 );
                //this.transitionTo( ResultSceneKey,500 );
            }, this)
            .on('button.config', function () { //todo
                _scene.game.api.sound.play(_scene, 'right');
                _scene.log('button.config')
                DialogY(_scene, {
                    title: '系統設定',
                    content: CreateSettingsPanel(_scene),
                    extraConfig: {expand: {title: false, content: true}}, //標題不延展panel延展
                })
            })
            .on('button.help', function () { //todo
                _scene.game.api.sound.play(_scene,'right');
                _scene.log('button.help')

                DialogDefault(_scene, {
                    title: '使用說明',
                    content: `「注音習作」是以注音符號測驗
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
                        {imageKey:'mail', callback: function(){ _scene.game.api.iab.open('https://forms.gle/uc51sDPiUZ34Qiws9') }, closeDialog:true},
                        {imageKey:'yes', callback: undefined, closeDialog:true},
                    ],
                    extraConfig: { 
                        contentStyle: { fontFamily: Style.fontFamilyName, fontSize: 40 },
                    }
                })
            })

        //this.log(`${mainMenu.width}x${mainMenu.height}`)

        ////////////////////////////////////////////

        var rtEvent1 = {
            id:'獲得補給001', 
            cmds: [['rteCbk','001']]
        };

        var rtEvent2 = {
            id:'獲得補給002', 
            cmds: [['rteCbk','002']]
        };            

        var storyEvent1 = {
            id:'三國演義', 
            cmds: [['storyCbk','001']],
        };

        var storyEvent2 = {
            id:'西遊記', 
            cmds: [['storyCbk','002']],
        };

/*         this.game.storytimer
            .addTimer(idGen(), { s: 5 }, storyEvent1 )
            .addTimer(idGen(), { s: 10 }, storyEvent2 )

        this.game.rttimer
            .addTimer(idGen(), { s: 1 }, rtEvent1)
            .addTimer(idGen(), { s: 2 }, rtEvent2) */

        ////////////////////////////////////////////

        super.create(); //createSysPanel & setupTransition

    }

    update() { }
}

export default Home;