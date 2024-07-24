var PixelOut = function (scene, duration, layerName) {

    if (layerName == undefined){
        var layers = scene.layerManager.getLayers();
        layers.forEach(layer => {
            scene.layerManager.setCamera(layer.name, "main");
        });
        var camera = scene.cameras.getCamera("main"); //將全部的layer都移到main
    } else {
        var camera = scene.cameras.getCamera(layerName); //指定layer
    }

    var effect = camera.postFX.addPixelate(0); //格子大小從0~200
    scene.tweens.add({
        targets: effect,
        amount: 200,
        duration: duration*0.4,
    })
        // .on('complete', function () {
        //     camera.postFX.remove(effect);
        // })

}

export default PixelOut;