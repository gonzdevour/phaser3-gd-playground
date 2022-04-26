import CreateKnob from "../build/view/style/CreateKnob.js";

var LoadingProgressUI = function(scene) {
    var ui = CreateKnob(scene).layout();
    ui.waitComplete = scene.plugins.get('rexEventPromise').waitComplete;
    scene.plugins.get('rexLoadingProgress').add(ui, {
        transitIn: function (gameObject) {
            return gameObject.popUpPromise(0);
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
            gameObject.setValue(progress); // Present progress changing
        }
    });
    // ui will be destroyed after loading completed
}

export default LoadingProgressUI;