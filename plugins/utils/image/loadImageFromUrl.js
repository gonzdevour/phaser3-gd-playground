var loadImageFromUrl = function(scene,key,url, LoadingProgress, progressUI, pseudoDuration){
    return new Promise(function (resolve, reject) {

        var loadSuccess = function (key, type, data){
            console.log('load online image ' + key + ' complete');
            resolve('loadImgSuccess');
        }
        
        var loadError = function (fileObj){
            console.log('load online image ' + key + ' failed');
            resolve('loadImageError');
        }

        scene.load
            .image(key,url)
            .once('filecomplete-image-' + key, loadSuccess, scene)
            .once('loaderror', loadError, scene)
            .start()
        if (typeof(LoadingProgress === 'function')){
            LoadingProgress(scene, progressUI, pseudoDuration);
        }
    })
    .then(function(){
        scene.load.off('filecomplete-image-' + key, loadSuccess, scene)
        scene.load.off('loaderror', loadError, scene)
    })
}

export default loadImageFromUrl;