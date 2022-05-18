import RTTimers from "./timer/RTTimers";

var CreateRTTimers = function (name, lsData, expiredHandler) {
  var config = {
    name: name,
    expiredCallback: function(data){
      expiredHandler.push(data); //msgQ.push(data)
    }
  };
  var rtt = new RTTimers(lsData, config);
  rtt.startRealTime(); //啟動timer計時/check
  return rtt;
}

export default CreateRTTimers;
