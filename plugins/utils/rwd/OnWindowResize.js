import AddEvent from "../../../../phaser3-rex-notes/plugins/utils/gameobject/addevent/AddEvent";

var OnWindowResize = function(scene, callback){
  var scale = scene.scale;
  AddEvent(scene, scale, 'resize', function(pointer, localX, localY, event){
      callback();
  });
}

export default OnWindowResize;