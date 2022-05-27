import ModalDialogPromise from "./ModalDialogPromise";

//utils
import GetValue from "../../../../../plugins/utils/object/GetValue";

var DialogY = function (scene, titleTxt, contentTxt, config) {
    return ModalDialogPromise(scene, {
        title: titleTxt,
        content: contentTxt,
        buttonMode: 1,
        width: GetDialogWidth(scene, config),
    })
}

var DialogFatal = function (scene, titleTxt, contentTxt, config) {
    return ModalDialogPromise(scene, {
        title: titleTxt,
        content: contentTxt,
        buttonMode: 4,
        width: GetDialogWidth(scene, config),
    })
}

var DialogSelect = function (scene, titleTxt, contentTxt, config) {
    return ModalDialogPromise(scene, {
        title: titleTxt,
        content: contentTxt,
        buttonMode: 5,
        buttonsData: config.buttonsData, //buttonsData:{ifShuffle:1/0, list:[{imgKey:key, text:text, indexFixed:0/1},...]}
        width: GetDialogWidth(scene, config),
    })
}

var GetDialogWidth = function(scene, config){
    var widthFromConfig = GetValue(config, 'width', undefined);
    var widthFromRexViewport = GetValue(scene, 'viewport.displayWidth', undefined);
    var widthFromGameSetting = scene.game.config.width;
    if(widthFromConfig){
        return widthFromConfig;
    } else if(widthFromRexViewport){
        return widthFromRexViewport-50;
    } else {
        return widthFromGameSetting-50
    }
}

export { 
    DialogSelect,
    DialogY,
    DialogFatal,
};