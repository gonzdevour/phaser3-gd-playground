import GetValue from "../../../../plugins/utils/object/GetValue";
import CreateGridTable from "./CreateGridTable";

var ModalGridTablePromise = function (scene, config) {
    //建立gridTable
    var gridTable = CreateGridTable(scene, config);
    //modalPromise的manualClose設定是否手動關閉(預設為1==手動關閉)
    config.buttonMode = GetValue(config, 'buttonMode', 1)
    //將dialog再包裝為modal，並建立promise
    return scene.rexUI.modalPromise(gridTable, config);
}

export default ModalGridTablePromise;