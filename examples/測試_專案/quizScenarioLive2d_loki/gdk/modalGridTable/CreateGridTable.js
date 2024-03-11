var CreateGridTable = function (scene, config) {
    var gridTable = scene.rexUI.add.gridTable(config)
        .on('cell.click', function(cellContainer, cellIndex, pointer){
            console.log('cell.click ' + cellIndex)
        })
        .on('cell.down', function(cellContainer, cellIndex, pointer){
            console.log('cell.down ' + cellIndex)
        })
        .on('cell.up', function(cellContainer, cellIndex, pointer){
            console.log('cell.up ' + cellIndex)
        })
        .on('modal.open', function(modalBehavior){
            gridTable.broadcastEvent('gridTable.open', scene);
        })
        .on('modal.close', function(closeEventData, modalBehavior){
            gridTable.broadcastEvent('gridTable.close', scene);
        })
        //執行排版
        .layout()
        // .once('sizer.postlayout', function(child, sizer){
        //   //child.scrollToBottom();
        // })
        // .drawBounds(scene.add.graphics(), 0xff0000);

    //將modal底板移到dialog的下層
    if (config.background) {
        gridTable.moveDepthBelow(config.background);
    }
    //如果有給viewport參數就加入vpcoordinate系統
    // if (config.viewport){
    //     gridTable.viewport = config.viewport;
    //     scene.vpc.add(gridTable, gridTable.viewport);
    // }

    return gridTable
}

export default CreateGridTable;