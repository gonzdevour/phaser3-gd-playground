import CsvToHashTable from '../../../../../phaser3-rex-notes/plugins/csvtohashtable.js';
import mustache from "mustache";
import AppLang from '../../../../plugins/utils/language/AppLang.js';

class TableLocalization extends CsvToHashTable {
  constructor(lsData, loccsv, config) {
    super(config);
    this.lsData = lsData;
    this.mtView = {};
    this.loadCSV(loccsv);
  }
  loc(key, view) {
    var mustacheView = view?view:this.mtView //有給view就用view，沒有就用預設值
    var langFromLs = this.lsData.get('appLangAlias');
    var langFromDefault = AppLang();
    var lang = langFromLs?langFromLs:langFromDefault;//ls有就用ls的，否則用預設值
    var value = super.get(key, lang);
    var renderedValue = mustache.render(value, mustacheView);
    return renderedValue
  }
}

export default TableLocalization;