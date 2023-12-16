import TableLocalization from "./table/TableLocalization";

var CreateLocalization = function (lsData, config) {
  var localization = new TableLocalization(lsData, config);
  return localization;
}

export default CreateLocalization;
