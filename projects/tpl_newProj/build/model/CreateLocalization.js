import TableLocalization from "../../model/table/TableLocalization";

var CreateLocalization = function (config) {
  var localization = new TableLocalization(config);
  return localization;
}

export default CreateLocalization;
