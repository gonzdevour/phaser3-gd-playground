import CreateKnob from '../templates/CreateKnob.js';

var LoadingProgressUI = function(scene, pseudoDuration) {
    var ui = CreateKnob(scene).layout();

    if (pseudoDuration){
        ui.pseudoProgress = scene.tweens.add({
            targets: ui,
            ease: 'linear',
            value: 1,
            duration: pseudoDuration,
        })
    }

    ui.waitComplete = scene.plugins.get('rexEventPromise').waitComplete;
    scene.plugins.get('rexLoadingProgress').add(ui, {
        transitIn: function (gameObject) {
            return gameObject.popUpPromise(0); //sizer的function，popUpPromise(duration)
        },
        transitionOut: function (gameObject) {
            return gameObject.waitComplete(scene.tweens.add({ //waitComplete會支援監聽所有eventName為'complete'的事件，例如transition
                targets: gameObject,
                ease: 'cubic',
                alpha: 1,
                duration: 300
                }))
        },
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
}

export default LoadingProgressUI;