import LoadAPI from "../res/api/loadAPI.js";
import DialogDefault from "../build/view/modaldialog/dialogs/DialogDefault.js";
import LoadingProgressUI from "./LoadingProgressUI.js";

var Loading = function(scene) {
    var assetPack = {};
    //load csv from googlesheet
    scene.load.text('db0','https://docs.google.com/spreadsheets/d/e/2PACX-1vQWaeZDoFdraJRJtlfcpOpZ0RaBUHn6hO7VkfgH_RwT_qK1D9nLKWJBcXkyvWw9flaU2mUBlbZhSN-c/pub?gid=1563367807&single=true&output=csv')
    scene.load.text('db1','https://docs.google.com/spreadsheets/d/e/2PACX-1vQWaeZDoFdraJRJtlfcpOpZ0RaBUHn6hO7VkfgH_RwT_qK1D9nLKWJBcXkyvWw9flaU2mUBlbZhSN-c/pub?gid=999894934&single=true&output=csv')
    scene.load.text('localization', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS7UIICMLMep8fMKULxkMu-OfDcuH3_k18YU1I9eEQQuMtXP7QgVvcvgW3nP488SsrwFhBTSNq9G6KK/pub?gid=1845660007&single=true&output=csv')
    //load pack
    scene.load.pack('pack', 'assets/pack.json');
    //load api
    async function load(onSuccess, onError) {
        scene.game.api = await LoadAPI(); //回傳字典api.sound|dialog|speech|iap|ads|idfa
        onSuccess();
    }
    scene.load.rexAwait(load);//參數:callback(onSuccess,onError)，要執行callback才會完成rexAwait

    //loadingProgress
    LoadingProgressUI(scene);
    
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