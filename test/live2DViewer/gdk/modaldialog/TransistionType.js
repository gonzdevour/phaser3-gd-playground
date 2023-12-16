import AutoRemoveTween from "../../../../../phaser3-rex-notes/plugins/utils/tween/AutoRemoveTween";

//Out

//Choice上浮、ChoiceBackground閃爍、dialog收縮
var TransitionChoicesUpScaleDown = function(dialog, duration) {
  var scene = dialog.scene;
  //取出dialog中被選中的buttons
  var selectedButtons = [];
  var choicesState = dialog.getChoicesButtonStates();
  var idx = 0;
  for (var name in choicesState) {
      if (choicesState[name] === true){
          selectedButtons.push(dialog.getChoice(idx))
      }
      idx++;
  }
  //取出被選中的buttons的backgrounds
  var selectedBgs = [];
  selectedButtons.forEach(function(item, idx, arr){
      var bbg = item.getElement('background')
      AutoRemoveTween(bbg, {ease: 'Linear', alpha: 0, duration: 300, yoyo: true, repeat:5,})
      selectedBgs.push(bbg);
  })
  //依序執行tween
  //AutoRemoveTween(selectedBgs, {ease: 'Linear', alpha: 0, duration: 300, yoyo: true, repeat:5,})
  scene.tweens.timeline({
      tweens: [
          { targets: selectedButtons, ease: 'Cubic', y: '-=20', duration: 300, yoyo:true, completeDelay: 400 },
          { targets: dialog, ease: 'Cubic', x: '+=300', alpha: 0, duration: 400,},
      ]

  });
}

//In

//Choice上浮、ChoiceBackground閃爍、dialog收縮
var TransitionLR = function(dialog, duration) {
  var scene = dialog.scene;
  var choices = dialog.getElement('choices');
  choices.forEach(function(choice, idx, arr){
    var Ang = choice.angle-5+Math.random()*10;
    //dialog.tweenChild({targets: choice, ease: 'Linear', angle:Ang, duration: 300+100*Math.random(),});
  })
  //dialog.tweenChild({targets: choices, ease: 'Linear', x:{from: '-=100', to:0}, duration: 1400,});
  AutoRemoveTween(dialog, {ease: 'Cubic', x: { from: dialog.x-300, to: dialog.x }, alpha: { from: 0, to: 1 }, duration: 600,})
}


export {
  TransitionChoicesUpScaleDown,
  TransitionLR,
};