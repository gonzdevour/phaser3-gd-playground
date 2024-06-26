var addImageFromUrl = function(scene,x,y,key,url, loadingProgressUI, pseudoDuration){
    return new Promise(function (resolve, reject) {
        scene.load
            .image(key,url)
            .once('filecomplete-image-' + key, function (key, type, data){
                console.log('add online image ' + key + ' complete');
                var result = scene.add.image(x,y,key);
                resolve(result);
            }, scene)
            .start()
        if (typeof(loadingProgressUI === 'function')){
            loadingProgressUI(scene, pseudoDuration);
        }
    });
}

export default addImageFromUrl;