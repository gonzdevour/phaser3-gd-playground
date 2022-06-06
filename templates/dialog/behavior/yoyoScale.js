//utils
import GetValue from "../../../plugins/utils/object/GetValue";

var yoyoScale = function (label, config) {
  label
      .on('dialog.open',function(scene){
          yoyoScaleStart(scene, label, config);
      })
      .on('dialog.close',function(scene){
          yoyoScaleRemove(label);
      })

  return label;
}

var yoyoScaleStart = function(scene, yoyoTarget, config){
  yoyoTarget.yoyoScale = scene.tweens.add({
      targets: yoyoTarget,
      scale: GetValue(config, 'scale', 1.2),
      ease: GetValue(config, 'ease', 'Linear'),       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: GetValue(config, 'duration', 500),
      repeat: -1,
      yoyo: true
  });
  return yoyoTarget;
}

var yoyoScaleRemove = function(yoyoTarget){
  if(yoyoTarget.yoyoScale){
      yoyoTarget.yoyoScale.restart().stop().remove();
  }
  return yoyoTarget;
}

export default yoyoScale;