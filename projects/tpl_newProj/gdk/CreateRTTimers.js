import RTTimers from "./timer/RTTimers";

var CreateRTTimers = function (name, lsData, config) {
  if(config == undefined){
    config = {};
  }
  config.name = name;
  var rtt = new RTTimers(lsData, config);
  return rtt;
}

export default CreateRTTimers;
