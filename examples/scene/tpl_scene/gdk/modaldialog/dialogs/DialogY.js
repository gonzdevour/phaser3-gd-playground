import DialogDefault from "./DialogDefault.js";

//utils
import GetValue from "gdkPlugins/utils/object/GetValue.js";

var DialogY = function (scene, config) {
  var dialogConfig =  {
    name: 'DialogY',
    title: GetValue(config, 'title', undefined),
    content: GetValue(config, 'content', undefined),
    actions: GetValue(config, 'actions', [{imageKey:'ico_yes', callback:undefined, closeDialog:true}]),
    extraConfig: GetValue(config, 'extraConfig', {}),
  }
  //addBehaviors(dialogConfig.actions, ['dialogYoyoScale','ninja'])
  addBehaviors(dialogConfig.actions, ['ninja'])

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