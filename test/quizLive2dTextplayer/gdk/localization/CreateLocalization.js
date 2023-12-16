import TableLocalization from "./TableLocalization";

var CreateLocalization = function (lsData, loccsv, config) {
  var localization = new TableLocalization(lsData, loccsv, config);
  return localization;
}

export default CreateLocalization;
