var createTextLabel = function(scene, layerName, vpxOffset, vpyOffset, text, vpx, vpy){
      return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0xaa9933).setStrokeStyle(2, 0xffffff),
        text: scene.rexUI.add.BBCodeText(0, 0, text, { fontSize: 24 }),
        //icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
        align: "center",
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10}
    })
    .setMinSize(50,50)
    .layout()
    ._locate({
      layerName: layerName,
      vpx: vpx,
      vpy: vpy,
      vpxOffset: vpxOffset,
      vpyOffset: vpyOffset,
    })
}

export default createTextLabel;