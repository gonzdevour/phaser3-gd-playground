import GetValue from '../object/GetValue.js'

async function GetDocsFromGoogleDriveFolder(config) {

  var folderId = GetValue(config, "folderId", undefined);
  var url = GetValue(config, "url", undefined);

  let data2req = {
    folderId: folderId,
  };
  
  let encodedJsonString = encodeURIComponent(JSON.stringify(data2req));
  
  try {
      const response = await fetch(`${url}?data=${encodedJsonString}`);
      const data = await response.text();
      return data; // 返回从 Google Apps Script 获取的数据
  } catch (error) {
      return error; // 返回错误信息
  }
}

export default GetDocsFromGoogleDriveFolder;