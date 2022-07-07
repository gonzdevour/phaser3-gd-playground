var addImageFromUrl = function(scene,x,y,key,url){
    return new Promise(function (resolve, reject) {
        scene.load
            .image(key,url)
            .once('filecomplete-image-' + key, function (key, type, data){
                console.log('load image ' + key + ' complete');
                var result = scene.add.image(x,y,key);
                resolve(result);
            }, scene)
            .start()
    });
}

export default addImageFromUrl;