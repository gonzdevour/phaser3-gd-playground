var loadImageFromUrl = function(scene,key,url, LoadingProgress, progressUI, pseudoDuration){
    return new Promise(function (resolve, reject) {
        scene.load
            .image(key,url)
            .once('filecomplete-image-' + key, function (key, type, data){
                console.log('load online image ' + key + ' complete');
                resolve();
            }, scene)
            .start()
        if (typeof(LoadingProgress === 'function')){
            LoadingProgress(scene, progressUI, pseudoDuration);
        }
    });
}

export default loadImageFromUrl;