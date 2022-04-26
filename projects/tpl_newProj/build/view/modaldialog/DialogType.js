import ModalDialogPromise from "./ModalDialogPromise";

var TypeY = function (scene, titleTxt, contentTxt) {
    ModalDialogPromise(scene, {
        title: titleTxt,
        content: contentTxt,
        buttonMode: 1,
        width: scene.viewport.displayWidth-50,
    })
}

export { 
    TypeY,
};