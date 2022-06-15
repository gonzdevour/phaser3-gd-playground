/**
* @param {number} ms - ms from clock.now.
* @return {string} - zeropaded timer string.
*/

var zeropadedTimerString = function (ms){
  
  let totalSecs = Math.floor(ms/1000);
  let totalMins = Math.floor(totalSecs/60);
  let totalHours = Math.floor(totalMins/60);

  let modSecs = totalSecs%60;
  let modMins = totalMins%60;

  let zpHours = totalHours<10?('0'+totalHours):totalHours;
  let zpMins = modMins<10?('0'+modMins):modMins;
  let zpSecs = modSecs<10?('0'+modSecs):modSecs;

  let result = zpHours + ':' + zpMins + ':' + zpSecs;

  return result;
 };
 
 module.exports = zeropadedTimerString;