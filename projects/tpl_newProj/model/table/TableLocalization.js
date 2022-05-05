import CsvToHashTable from '../../../../../phaser3-rex-notes/plugins/csvtohashtable.js';
import mustache from "mustache";
import loccsv from 'raw-loader!../../assets/localization.csv';

class TableLocalization extends CsvToHashTable {
  constructor(config) {
    super(config);
    this.loadCSV(loccsv);
  }
  loc(key, lang, view) {
    var value = super.get(key, lang);
    var renderedValue = mustache.render(value, view);
    return renderedValue
  }
}

export default TableLocalization;