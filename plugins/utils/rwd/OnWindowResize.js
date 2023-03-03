import AddEvent from "../../../../phaser3-rex-notes/plugins/utils/gameobject/addevent/AddEvent";

var OnWindowResize = function(scene, callback, target){
  if (target == undefined){
    target = scene;
  }
  var scale = scene.scale;
  AddEvent(target, scale, 'resize', function(pointer, localX, localY, event){
      callback();
  });
}

export default OnWindowResize;