var loadImageFromUrl = function (scene, key, url, LoadingProgress, progressUI, pseudoDuration) {
    return new Promise(function (resolve, reject) {

        var loadSuccess, loadError, onComplete;

        loadSuccess = function (key, type, data) {
            console.log('load online image ' + key + ' complete');
            onComplete();
            resolve();
        }

        loadError = function (fileObj) {
            console.log('load online image ' + key + ' failed');
            onComplete();
            reject();
        }

        onComplete = function () {
            scene.load
                .off('filecomplete-image-' + key, loadSuccess)
                .off('loaderror', loadError)
        }

        scene.load
            .image(key, url)
            .once('filecomplete-image-' + key, loadSuccess)
            .once('loaderror', loadError)
            .start()

        if (typeof (LoadingProgress === 'function')) {
            LoadingProgress(scene, progressUI, pseudoDuration);
        }
    })
}

export default loadImageFromUrl;