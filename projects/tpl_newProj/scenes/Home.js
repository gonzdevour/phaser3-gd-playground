import 'phaser';
import Base from './Base.js';
import * as SceneKey from '../settings/SceneKey.js';
import CreateMainMenuPanel from '../build/view/mainmenupanel/CreateMainMenuPanel.js';
import ModalDialogPromise from '../build/view/modaldialog/ModalDialogPromise.js';
import CreateSettingsPanel from '../build/view/mainmenupanel/CreateSettingsPanel.js';
import Style from '../settings/Style.js';

import msgQueue1 from '../gdk/msgqueue/msgQueue.js';
import { DialogY } from '../build/view/modaldialog/DialogType.js';

//utils
import idGen from '../../../plugins/utils/id/idGen.js';
import msgQueue from '../gdk/msgqueue/msgQueue.js';

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
                ModalDialogPromise(_scene, {
                    title: '系統設定',
                    content: CreateSettingsPanel(_scene),
                    buttonMode: 1,        
                    width: _scene.viewport.displayWidth-50,
                })
            }, this)
            .on('button.help', function () { //todo
                _scene.game.api.sound.play(_scene,'right');
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
                    callbackMail: function(){ _scene.game.api.browser.open('https://forms.gle/uc51sDPiUZ34Qiws9') },        
                    width: _scene.viewport.displayWidth-50,
                })
            }, this)

        //this.log(`${mainMenu.width}x${mainMenu.height}`)

        ////////////////////////////////////////////

        var msgQ = new msgQueue1(this.game.lsData);
        msgQ
            .on('start', function(){
                console.log('msgQstart')
                msgQ.startPop(PopCallback.bind(this), this);
            },this)
            .on('push', function(msg){
                console.log('msgQpushed')
                msgQ.startPop(PopCallback.bind(this), this);
            },this)

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

        this.game.storytimer
            .setExpiredCallback(function(data){
                msgQ.push(data);
            })
            .addTimer(idGen(), { s: 5 }, storyEvent1 )
            .addTimer(idGen(), { s: 10 }, storyEvent2 )

        this.game.rttimer
            .startRealTime()
            .addTimer(idGen(), { s: 1 }, rtEvent1)
            .addTimer(idGen(), { s: 2 }, rtEvent2)

        this.input.on('wheel',function(){
            this.game.storytimer.pushTime({s:1})
            console.log('push 1 sec')
        },this)

        ////////////////////////////////////////////

        super.create(); //createSysPanel & setupTransition

    }

    update() { }
}

var PopCallback = async function (msg) {
    var lo = this.game.localization;
    var result = await DialogY(this, lo.loc('select-db-title'), msg.id)
    //return (result.index === 0);//true:繼續popAll，false:中斷popAll
    return true;
}

export default Home;