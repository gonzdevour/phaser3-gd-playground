import AutoRemoveTween from "rexnotePlugins/utils/tween/AutoRemoveTween";

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
  //取出被選中的buttons的backgrounds做flash
  // var selectedBgs = [];
  // selectedButtons.forEach(function(item, idx, arr){
  //     var bbg = item.getElement('background')
  //     AutoRemoveTween(bbg, {ease: 'Linear', alpha: 0, duration: 200, yoyo: true, repeat:1,})
  //     selectedBgs.push(bbg);
  // })

  //依序執行tween

  // scene.tweens.timeline({ //方法已廢棄
  //     tweens: [
  //         //{ targets: selectedButtons, ease: 'Cubic', y: '-=20', duration: 300, yoyo:true, completeDelay: 400 },
  //         { targets: dialog, ease: 'Cubic', vpy: '+=0.5', alpha: 0, duration: 400,},
  //     ]

  // });
  scene.tweens.add({
    targets: dialog, 
    ease: 'Cubic', 
    vpy: '+=0.5', 
    alpha: 0, 
    duration: 400
  })
}

//In

//左滑到右
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

//右滑到左
var TransitionRL = function(dialog, duration) {
  var scene = dialog.scene;
  var choices = dialog.getElement('choices');
  choices.forEach(function(choice, idx, arr){
    var Ang = choice.angle-5+Math.random()*10;
    //dialog.tweenChild({targets: choice, ease: 'Linear', angle:Ang, duration: 300+100*Math.random(),});
  })
  //dialog.tweenChild({targets: choices, ease: 'Linear', x:{from: '-=100', to:0}, duration: 1400,});
  AutoRemoveTween(dialog, {ease: 'Cubic', x: { from: dialog.x+300, to: dialog.x }, alpha: { from: 0, to: 1 }, duration: 600,})
}

//下滑到上
var TransitionBT = function(dialog, duration) {
  var scene = dialog.scene;
  var choices = dialog.getElement('choices');
  choices.forEach(function(choice, idx, arr){
    var Ang = choice.angle-5+Math.random()*10;
    //dialog.tweenChild({targets: choice, ease: 'Linear', angle:Ang, duration: 300+100*Math.random(),});
  })
  //dialog.tweenChild({targets: choices, ease: 'Linear', x:{from: '-=100', to:0}, duration: 1400,});
  var yFrom = 1.5;
  var yTo = 0.3;
  //AutoRemoveTween(dialog, {ease: 'Cubic', y: { from: yFrom, to: yTo }, alpha: { from: 0, to: 1 }, angle: { from: -45, to: 3 }, duration: 600,})
  AutoRemoveTween(dialog, {ease: 'Cubic', vpy: { from: yFrom, to: yTo }, alpha: { from: 0, to: 1 }, duration: 600,})
}

var TransitionBTAlignBottom = function(dialog, duration) { //quiz專用
  var scene = dialog.scene;
  var choices = dialog.getElement('choices');
  choices.forEach(function(choice, idx, arr){
    var Ang = choice.angle-5+Math.random()*10;
    //dialog.tweenChild({targets: choice, ease: 'Linear', angle:Ang, duration: 300+100*Math.random(),});
  })
  //dialog.tweenChild({targets: choices, ease: 'Linear', x:{from: '-=100', to:0}, duration: 1400,});
  var yFrom = scene.viewport.bottom+0.5*dialog.height;
  var yTo = scene.viewport.bottom-0.5*dialog.height;
  AutoRemoveTween(dialog, {ease: 'Cubic', y: { from: yFrom, to: yTo }, alpha: { from: 0, to: 1 }, angle: { from: -45, to: 3 }, duration: 600,})
}

//title下滑到上
var TransitionScaleUpTitleUP = function(dialog, duration) {
  var title = dialog.getElement('title');
  var separator = dialog.getElement('title.separator');
  var text = dialog.getElement('title.text');

  var content = dialog.getElement('content');

  // setTimeout(() => {
  //   title.setAlpha(1);
  //   content.setAlpha(1);
  // }, 100);

  separator.setScale(0,1);
  text.setScale(1,0);

  title.tweenChild({
    targets: text,
    scaleY: { start: 0, to: 1 },
    duration: 500,
    delay: 500+300,
    ease: 'Linear',
  })

  title.tweenChild({
    targets: separator,
    scaleX: { start: 0, to: 1 },
    duration: 300,
    delay: 500,
    ease: 'Linear',
  })

  dialog.tweenChild({
    targets: title,
    y: {from: 100, to:0},
    duration: 1000,
    delay: 0,
    ease: 'Cubic',
  })

  AutoRemoveTween(dialog, {ease: 'Cubic', scale: { from: 0, to: 1 }, duration: 600,})
}

export {
  TransitionChoicesUpScaleDown,
  TransitionLR,
  TransitionRL,
  TransitionBT,
  TransitionBTAlignBottom,
  TransitionScaleUpTitleUP,
};