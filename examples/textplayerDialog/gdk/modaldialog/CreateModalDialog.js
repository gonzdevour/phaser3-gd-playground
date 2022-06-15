//utils
import GetValue from "../utils/object/GetValue";

var CreateModalDialog = function (scene, config) {
    //這邊開始處理dialog要用到的config
    if (config === undefined) {
        config = {};
    }
    config.buttonMode = GetValue(config, 'buttonMode', 0)//按鈕模式，聯動控制modalPromise的manualClose設定是否手動關閉

    var dialog = scene.rexUI.add.dialog(config);

    //將modal底板移到dialog的下層
    if (config.background) {
        dialog.moveDepthBelow(config.background);
    }

    return dialog;
}

export default CreateModalDialog;