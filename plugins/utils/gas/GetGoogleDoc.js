import GetValue from '../object/GetValue.js'

async function GetGoogleDoc(config) {

  var docId = GetValue(config, "id", undefined);
  var url = GetValue(config, "url", undefined);

  let data2req = {
      docId: docId,
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

export default GetGoogleDoc;