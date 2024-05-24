var CameraDragScroll = function(scene){
  var camMain = scene.cameras.main
      camMain.enableDragScroll = true;
  //dragVector, pinch
  var dragScale = scene.rexGestures.add.pinch(scene);
  dragScale
      .on('drag1', function (dragScale) {
        if(camMain.enableDragScroll){
            var drag1Vector = dragScale.drag1Vector;
            camMain.scrollX -= drag1Vector.x / camMain.zoom;
            camMain.scrollY -= drag1Vector.y / camMain.zoom;
        }
      })
      .on('pinch', function (dragScale) {
        if(camMain.enableDragScroll){
            var scaleFactor = dragScale.scaleFactor;
            camMain.zoom *= scaleFactor;
        }
      }, scene)

    return dragScale;
}

export default CameraDragScroll;