//mdvn
import MDScenario from 'rexnote/templates/mdscenario/MDScenario.js';
import TextBoxStyle from '../gdk/mds/mdvn/styles/TextBoxStyle.js';
import ChoiceStyle from '../gdk/mds/mdvn/styles/ChoiceStyle.js';
import TitleStyle from  '../gdk/mds/mdvn/styles/TitleStyle.js';
import NameInputStyle from '../gdk/mds/mdvn/styles/NameInputStyle.js';
import { monitorProps } from '../scripts/memory.js'
//memory & monitor
import CreateMonitor from '../scripts/CreateMonitor.js';

var CreateMds = function(scene, layerName, memory, sheetsData){
    var viewport = scene.viewport;
    var mvdnLayer = scene.layerManager.getLayer(layerName);

    var mds = new MDScenario(scene, {
        styles: {
            TEXTBOX: TextBoxStyle,
            CHOICE: ChoiceStyle,
            TITLE: TitleStyle,
            NAMEINPUT: NameInputStyle,
        },
        rootLayer: mvdnLayer, //指定mdvn使用的root layer
        viewport: viewport, //指定viewport讓vpx,vpy,vpw,vph起作用
    })
    .on('start', function(groupName, mds){ 
        console.log(`[mds.start]${groupName}`);
        if (groupName == '歷史事件') {
            console.log(`今天是` + mds.getData('date')) //歷史事件的執行以日期為主要條件
        }
    })
    .on('complete', function (groupName, mds) {
        //console.log('complete //以下印出memory');
        //console.log(mds.memory)
        if (groupName == '歷史事件') {
            mds.startGroup('隨機事件');
        }
    })
    .on('eventsheet.enter', function(title, groupName, mds){ 
        console.log(`[eventsheet.enter]${groupName} - ${title}`);
    })
    .on('eventsheet.exit', function(title, groupName, mds){ 
        console.log(`[eventsheet.exit]${groupName} - ${title}`);
    })
    .on('pause.input', function () {
        console.log('pause.input //Wait any click to continue');
        // waitInputGameObject.y -= 80;
        // this.tweens.add({
        //     targets: [waitInputGameObject],
        //     alpha: { value: 1, duration: 500 },
        //     scale: { value: 1.2, ease: 'back', duration: 800 },
        //     y: { value: '+=80', ease: 'back', duration: 800 },
        // })
    }, this)
    .on('resume.input', function () {
        console.log('resume.input');
        // this.tweens.add({
        //     targets: [waitInputGameObject],
        //     alpha: 0,
        //     scale: 0,
        //     y: '-=80',
        //     duration: 500
        // })
    }, this)
    //系統與介面參數
    .setData('clickTarget', 'screen')
    .setData('clickShortcutKeys', 'SPACE|ENTER')
    .setData('$typingSpeed',50)
    .setData('$transitionDuration',1000) //BG.cross, SPRITE.cross
    .setData('$shakeDuration',1000)
    .setData('$shakeMagnitude',50)
    .setData('$tintOthers',0x333333) //SPRITE.focus
    .setData('vpw',viewport.width)
    .setData('choiceWidth',viewport.portrait?viewport.width*0.8:viewport.width*0.5)
    //memory為遊戲內參數，呼叫函數時傳入
    .setData(memory)

    //sheets
    sheetsData.forEach(element => {
        mds.addEventSheet(element.content, element.groupName)
    });

    mds.monitor = CreateMonitor(scene, 0, 0, mds.memory, monitorProps)
        .changeOrigin(1,0)
        ._locate({
            layerName: "system",
            vpx: 1,
            vpy: 0,
        })

    return mds;
}

export default CreateMds;