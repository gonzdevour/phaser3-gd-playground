import OnWindowResize from "gdkPlugins/utils/rwd/OnWindowResize";

var createBg = function(scene, layerName, vpxOffset, vpyOffset, key, vpx, vpy){
    var bg = scene.add.image(0, 0, key)
    ._locate({
      layerName: layerName,
      vpx: vpx,
      vpy: vpy,
      vpxOffset: vpxOffset,
      vpyOffset: vpyOffset,
    })
    //._resizeByHeight(scene.viewport.height) //不處理onResize，直橫切換/onResize時會被裁切
    
    var UpdateViewport = (function(gameSize, baseSize, displaySize, previousWidth, previousHeight) { //處理onResize，會保持原來的大小，但圖片要給足寬高不然會露出黑邊
      bg._resizeByHeight(scene.viewport.height)
    }).bind(scene);
    OnWindowResize(scene, UpdateViewport, bg);
    UpdateViewport();

    return bg
}

export default createBg;