import GetValue from "gdkPlugins/utils/object/GetValue";
import AutoRemoveTween from "rexnotePlugins/utils/tween/AutoRemoveTween";
import { Delay } from "rexnotePlugins/eventpromise";
import { WaitEvent } from "rexnotePlugins/eventpromise";

//必須是async fucntion或promise

var actionsBeforeDialogClose = async function(scene, button, dialog, result){
  flash(button);
  await Delay(1000);
  var qMaster = scene.qMaster;
  qMaster.setExpression('F06').setMotionSpeed(1.5).startMotion('TapBody', 0, 'force');
  await qMaster.say(qMaster.question['Say' + GetValue(result, 'singleSelectedName', 1) ]+'[wait=500]')
  //中途加入nextQbutton的兩個方法：
  //方法1:
  // var btnNext = scene.rexUI.add.label({x:200, y:200, icon:scene.add.image(0,0,'yes')})
    // .setInteractive()
    // .layout()
  // await WaitEvent(btnNext, 'pointerup');
  //方法2:
  // var btnNext = scene.rexUI.add.label({x:200, y:200, icon:scene.add.image(0,0,'yes')})
  //   .onClick(function(button, gameObject){gameObject.emit('clicked')})
  //   .layout()
  // await WaitEvent(btnNext, 'clicked');
}

var flash = function(button){
  var bbg = button.getElement('background')
  AutoRemoveTween(bbg, {ease: 'linear', alpha: 0, duration: 200, yoyo: true, repeat:2,});
  AutoRemoveTween(button, {ease: 'cubic', y: '-=20', duration: 300, yoyo:true, completeDelay: 400});
}

export default actionsBeforeDialogClose;