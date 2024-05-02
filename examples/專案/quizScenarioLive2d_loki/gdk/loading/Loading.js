import LoadAPI from "../res/api/loadAPI.js";
import DialogDefault from "../build/view/modaldialog/dialogs/DialogDefault.js";
import LoadingProgress from "./LoadingProgress.js";
import { DefaultAppConfig } from "../../settings/DefaultData.js";

var Loading = function(scene) {

    //load csv from googlesheet
    var textToLoad = DefaultAppConfig.assets.text;
    textToLoad.forEach(function(item, idx, arr){
        scene.load.text(item.key, item.url);
    });
    
    //load pack
    var pack = DefaultAppConfig.assets.pack;
    scene.load.pack(pack.key, pack.url);

    //load api
    async function load(onSuccess, onError) {
        scene.game.api = await LoadAPI(); //回傳字典api.sound|dialog|speech|iap|ads|idfa
        onSuccess();
    }
    scene.load.rexAwait(load);//參數:callback(onSuccess,onError)，要執行callback才會完成rexAwait

    //loadingProgress
    LoadingProgress(scene);
    
    //onError
    var lo = scene.game.localization;
    scene.load.once('loaderror', function(fileObj){
        console.log('error-' + fileObj)
        DialogDefault(scene, {
            title: lo.loc('loading-error-title'), 
            content: lo.loc('loading-error-content',{ filename: fileObj.key })
        })
    }, scene);

}

export default Loading;