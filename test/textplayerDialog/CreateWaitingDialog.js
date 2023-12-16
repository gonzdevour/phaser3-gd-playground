//gdk
import { DialogSelect } from './gdk/modaldialog/DialogType';
import { DialogMultiSelect } from './gdk/modaldialog/DialogType';
import { TransitionChoicesUpScaleDown } from './gdk/modaldialog/TransistionType.js';
import { TransitionBT } from './gdk/modaldialog/TransistionType.js';
import dialogButtonClickCallback from './gdk/modaldialog/dialogButtonClickCallback.js';
//proj
import actionsBeforeDialogClose from './actionsBeforeDialogClose';

//dialog與textplayer演出

var CreateWaitingDialog = async function(textPlayer){
    var scene = textPlayer.scene;
    var question = textPlayer.question;
    var character = textPlayer.character;
    character.timeScale = 1;
    character.setExpression('F01').startMotion('Idle', 0, 'force')
    await textPlayer.playPromise(question['Q']);
    //choicesData:{ifShuffle:1/0, list:[{imgKey:key, text:text, indexFixed:0/1},...]}
    var result = await DialogSelect(scene, {
        //title: 'test title', 
        //content: 'test content', 
        actions: [
            {imageKey:'no', text: '清空', type: 'clear', callback: undefined},
            {imageKey:'yes', text: '確定', type: 'confirm', callback: undefined, closeDialog:true},
        ],
        choicesData: {
            ifShuffle:0,
            list: CreateChoiceDataList(question),
        },
        extraConfig: {
            x: scene.viewport.centerX,
            y: scene.viewport.bottom,
            width: scene.game.config.width-50, 
            cover: {color:0x663030, alpha: 0.1},
            transitIn: TransitionBT,
            transitOut: TransitionChoicesUpScaleDown,
            duration:{ in: 600, out: 1400 },
            dialogButtonClickCallback: dialogButtonClickCallback,
            actionsBeforeDialogClose: actionsBeforeDialogClose,
        }
    })
    //console.log('dialogResult:' + JSON.stringify(result))
    //character.timeScale = 1.5;
    //character.setExpression('F06').stopAllMotions().startMotion('TapBody', 0, 'force')
    //await textPlayer.playPromise(question['Say' + GetValue(result, 'singleSelectedName', 1) ]+'[wait=click][wait=500]')
    return result;
  }
  
  var CreateChoiceDataList = function(question){
    var result = [];
    for (let index = 0; index < question.Cnt; index++) {
        var data = {
            imageKey: undefined,
            text: question['A'+(index+1)],
            indexFixed: 1,
        };
        result.push(data);
    }
    //console.log(JSON.stringify(result))
    return result;
  }

  export default CreateWaitingDialog;