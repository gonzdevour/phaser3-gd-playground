import LoadAPI from "../res/api/loadAPI.js";
import CreateApi from "../build/model/CreateApi.js";
import ModalDialogPromise from "../build/view/modaldialog/ModalDialogPromise.js";
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
    scene.load.once('loaderror', function(fileObj){
        ModalDialogPromise(scene, {
            title: '讀取異常',
            content: 
`檔案：${fileObj.key}

請檢查裝置的連線狀態，
稍待片刻重新啟動APP。

如果情況沒有改善，
可能是伺服器正在維護中，
請至官方網站查詢。`,
            buttonMode: 4,    
            width: scene.viewport.displayWidth-50,
        })
    }, scene);
}

export default Loading;