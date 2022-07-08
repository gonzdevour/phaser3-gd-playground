var loadImageFromUrl = function(scene,key,url, loadingProgressUI, pseudoDuration){
    return new Promise(function (resolve, reject) {
        scene.load
            .image(key,url)
            .once('filecomplete-image-' + key, function (key, type, data){
                console.log('load online image ' + key + ' complete');
                resolve();
            }, scene)
            .start()
        if (typeof(loadingProgressUI === 'function')){
            loadingProgressUI(scene, pseudoDuration);
        }
    });
}

export default loadImageFromUrl;