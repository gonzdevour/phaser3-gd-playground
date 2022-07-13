//utils
import GetValue from "../../../../plugins/utils/object/GetValue";

var dialogYoyoScale = function (label, config) {
  label
      .on('dialog.open',function(scene){
        dialogYoyoScaleStart(scene, label, config);
      })
      .on('dialog.close',function(scene){
        dialogYoyoScaleRemove(label);
      })

  return label;
}

var dialogYoyoScaleStart = function(scene, yoyoTarget, config){
  yoyoTarget.dialogYoyoScale = scene.tweens.add({
      targets: yoyoTarget,
      scale: GetValue(config, 'scale', 1.2),
      ease: GetValue(config, 'ease', 'Linear'),       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: GetValue(config, 'duration', 500),
      repeat: -1,
      yoyo: true
  });
  return yoyoTarget;
}

var dialogYoyoScaleRemove = function(yoyoTarget){
  if(yoyoTarget.dialogYoyoScale){
      yoyoTarget.dialogYoyoScale.restart().stop().remove();
  }
  return yoyoTarget;
}

export default dialogYoyoScale;