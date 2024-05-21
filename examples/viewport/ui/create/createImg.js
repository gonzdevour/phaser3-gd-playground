var createImg = function(scene, layerName, vpx, vpy, key, vpxOffset, vpyOffset){
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