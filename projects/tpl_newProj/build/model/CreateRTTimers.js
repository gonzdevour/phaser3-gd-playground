import RTTimers from "../../model/timer/RTTimers";

var CreateRTTimers = function (lsData, config) {
  var rtt = new RTTimers(lsData, config);
  return rtt;
}

export default CreateRTTimers;
