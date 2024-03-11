import loki from 'lokijs';

class lokidb extends loki {
  constructor() {
    super();
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