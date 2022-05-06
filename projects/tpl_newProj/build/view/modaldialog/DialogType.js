import ModalDialogPromise from "./ModalDialogPromise";

var DialogY = function (scene, titleTxt, contentTxt) {
    return ModalDialogPromise(scene, {
        title: titleTxt,
        content: contentTxt,
        buttonMode: 1,
        width: scene.viewport.displayWidth-50,
    })
}

var DialogFatal = function (scene, titleTxt, contentTxt) {
    return ModalDialogPromise(scene, {
        title: titleTxt,
        content: contentTxt,
        buttonMode: 4,
        width: scene.viewport.displayWidth-50,
    })
}

export { 
    DialogY,
    DialogFatal,
};