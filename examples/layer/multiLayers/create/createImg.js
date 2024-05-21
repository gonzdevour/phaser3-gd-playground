var createImg = function(scene, layerName, vpxOffset, vpyOffset, key, vpx, vpy){
    var img = scene.add.image(0, 0, key)
    ._locate({
      layerName: layerName,
      vpx: vpx,
      vpy: vpy,
      vpxOffset: vpxOffset,
      vpyOffset: vpyOffset,
    })
    return img
}

export default createImg;