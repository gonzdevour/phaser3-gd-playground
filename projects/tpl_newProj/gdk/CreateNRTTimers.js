import RTTimers from "./timer/RTTimers";
import GetPeriodMS from "../../../../phaser3-rex-notes/plugins/utils/time/GetPeriodMS";

//- 有 getTimestampCallback 直接用它
//- 沒有 getTimestampCallback , 嘗試取得startTimestamp, 並且使用內建的getTimestampCallback 
//- 沒有startTimestamp, 使用系統目前時間

//Non-Real-TimeTimers
var CreateNRTTimers = function (name, lsData, expiredHandler, defaultCurTimeInStory) {
  if(defaultCurTimeInStory !== undefined){
    lsData.set('curTimeInStory', defaultCurTimeInStory) //注意curTimeInStory的單位必須是ms
  }
  var config = {
    name: name,
    expiredCallback: function(data){
      expiredHandler.push(data); //msgQ.push(data)
    },
    pushPeriodCallback: function(period){
      var curTimeInStory = lsData.get('curTimeInStory');
      var timeToAdd = GetPeriodMS(period);
      var newTimeInStory = curTimeInStory + timeToAdd;
      return lsData.set('curTimeInStory', newTimeInStory)
    },
    getTimestampCallback: function(){
      return lsData.get('curTimeInStory')
    }
  };
  var nrtt = new RTTimers(lsData, config);
  return nrtt;
}

export default CreateNRTTimers;
