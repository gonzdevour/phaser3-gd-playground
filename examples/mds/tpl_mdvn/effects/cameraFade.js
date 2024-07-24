var cameraFadeOut = function (scene, duration, cameraName = "ui") {
    var camera = scene.cameras.getCamera(cameraName);
    camera.fadeOut(duration * 0.4);
}

var cameraFadeIn = function (scene, duration, cameraName = "ui") {
    var camera = scene.cameras.getCamera(cameraName);
    camera.fadeIn(duration * 0.6);
}

export {cameraFadeOut, cameraFadeIn};