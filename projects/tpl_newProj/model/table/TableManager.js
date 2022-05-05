import CSVToHashTable from "../../../../../phaser3-rex-notes/plugins/csvtohashtable.js";
import mustache from "mustache";

class TableManager {
  constructor(scene) {
    this.scene = scene;
    this.lsData = scene.model.lsData;
  }
  add(key, mustacheView) {
    this[key] = this.load(key, mustacheView);
  }
  keyForLs(key) {
    return 'tb.' + key; //存讀tb的key給前綴以免混淆
  }
  load(key,mustacheView) { //table的來源可能為：asset(包括網路)|ls，格式可能為csv|JSON，ls有值則從ls取，無值從cache(asset)取
    var table = new CSVToHashTable();
    table.tbKey = key;//用於辨識save
    table.mtView = mustacheView?mustacheView:{}; //沒有mustacheView就以{}為view初始化，不同table有不同view
    var lsKey = this.keyForLs(key);
    if (this.lsData.has(lsKey)){
      var jsonData = this.lsData.get(lsKey);
      table.resetFromJSON(jsonData);
    } else {
      var csvData = this.scene.cache.text.get(key);
      table.loadCSV(csvData);
      this.save(table);
    }
    return table;
  }
  save(table) {
    var lsKey = this.keyForLs(table.tbKey);
    var data = table.toJSON()
    this.lsData.set(lsKey, data);
    return this.lsData.get(lsKey);
  }
  loc(key) {
    var lang = this.lsData.get('appLangAlias');
    var value = this.localization.get(key, lang);
    var renderedValue = mustache.render(value, this.localization.mtView);
    return renderedValue
  }
}

export default TableManager;