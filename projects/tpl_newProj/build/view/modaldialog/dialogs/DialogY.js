import DialogDefault from "./DialogDefault";

//utils
import GetValue from "../../../../../../plugins/utils/object/GetValue";

var DialogY = function (scene, config) {
  var dialogConfig =  {
    title: GetValue(config, 'title', ''),
    content: GetValue(config, 'content', ''),
    actions: GetValue(config, 'actions', [{imageKey:'yes', callback:undefined}]),
    extraConfig: GetValue(config, 'extraConfig', {}),
  }
  addBehaviors(dialogConfig.actions, ['dialogYoyoScale','ninja'])

  return DialogDefault(scene, dialogConfig)
}

var addBehaviors = function(targets, bhvs){
    targets.forEach(function(target, idx, arr){
        var originalBehaviors = GetValue(target, 'behavior', []);
        if(Array.isArray(originalBehaviors)){
            target.behavior = originalBehaviors.concat(bhvs);
        }
    })
    return targets;
}

export default DialogY;