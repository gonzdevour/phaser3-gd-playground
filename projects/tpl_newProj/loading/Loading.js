import LoadAPI from "../res/api/loadAPI.js";
import CreateApi from "../build/model/CreateApi.js";
import * as Dialog from '../build/view/modaldialog/DialogType.js';
import LoadingProgressUI from "./LoadingProgressUI.js";

var Loading = function(scene) {
    var assetPack = {};
    //load csv from googlesheet
    scene.load.text('db0','https://docs.google.com/spreadsheets/d/e/2PACX-1vQWaeZDoFdraJRJtlfcpOpZ0RaBUHn6hO7VkfgH_RwT_qK1D9nLKWJBcXkyvWw9flaU2mUBlbZhSN-c/pub?gid=1563367807&single=true&output=csv')
    scene.load.text('db1','https://docs.google.com/spreadsheets/d/e/2PACX-1vQWaeZDoFdraJRJtlfcpOpZ0RaBUHn6hO7VkfgH_RwT_qK1D9nLKWJBcXkyvWw9flaU2mUBlbZhSN-c/pub?gid=999894934&single=true&output=csv')
    //load pack
    scene.load.pack('pack', 'assets/pack.json');
    //load api
    async function load(onSuccess, onError) {
        scene.api = await LoadAPI();
        CreateApi(scene);
        //api.sound|dialog|speech|iap|ads|idfa
        onSuccess();
    }
    scene.load.rexAwait(load);//參數:callback(onSuccess,onError)，要執行callback才會完成rexAwait

    //loadingProgress
    LoadingProgressUI(scene);
    
    //onError
    var tb = scene.localization;
    scene.load.once('loaderror', function(fileObj){
        Dialog.TypeFatalError(scene, tb.loc('loading-error-title'), tb.loc('loading-error-content',{ filename: fileObj.key }))
    }, scene);

}

export default Loading;