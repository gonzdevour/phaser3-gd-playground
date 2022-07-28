var LoadingProgress = function(scene, ui, pseudoDuration) {

    if (pseudoDuration){
        ui.pseudoProgress = scene.tweens.add({
            targets: ui,
            ease: 'linear',
            value: 1,
            duration: pseudoDuration,
        })
    }

    ui.waitComplete = scene.plugins.get('rexEventPromise').waitComplete;
    ui.loadingProgress = scene.plugins.get('rexLoadingProgress').add(ui, {
        transitIn: false,
        transitOut: false,
        progress: function (gameObject, progress) { 
            if (pseudoDuration){
                if (progress == 1){
                    gameObject.pseudoProgress.stop();         
                    gameObject.setValue(progress); // Present progress changing
                } 
            } else {
                gameObject.setValue(progress); // Present progress changing
            }

        }
    });
    // ui will be destroyed after loading completed
    return ui;
}

export default LoadingProgress;