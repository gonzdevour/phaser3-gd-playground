import AppData from "./appdata/AppData";

var CreateAppData = function (lsData) {
  var appData = new AppData(lsData)
  return appData;
}

export default CreateAppData;
