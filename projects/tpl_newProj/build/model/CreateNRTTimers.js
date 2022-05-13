import RTTimers from "../../model/timer/RTTimers";

//- 有 getTimestampCallback 直接用它
//- 沒有 getTimestampCallback , 嘗試取得startTimestamp, 並且使用內建的getTimestampCallback 
//- 沒有startTimestamp, 使用系統目前時間

var CreateNRTTimers = function (lsData) {
  var config = {
    getTimestampCallback: function(){return lsData.get('curUnixInStory')}
  };
  var nrtt = new RTTimers(lsData, config);
  return nrtt;
}

export default CreateNRTTimers;
