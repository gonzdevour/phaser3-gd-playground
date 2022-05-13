import RealTimeTimers from "../../../../../phaser3-rex-notes/plugins/realtimetimers";
import { DefaultAppConfig } from "../DefaultData";

class RTTimers extends RealTimeTimers {
  constructor(lsData, config) {
    super(config);
    this.lsData = lsData;
    this.load();
    this.on('update', function () {                
      //console.log('update rtt:' + '\n' + JSON.stringify(this));
      // Save to localstorage or server here
      this.save()
    },this)
    this.on('remove', function (t, tArr) {                
      console.log('removed:' + '\n' + JSON.stringify(t));
    },this)
  }
  startRealTime() {
    this.check();
    setInterval(this.check.bind(this), 1000);
    return this;
  }
  save() {
    //console.log('rtt save' + '\n' + JSON.stringify(this));
    this.lsData.set(DefaultAppConfig.rttimerToJSONKey, this.toJSON());
    return this;
  }
  load() {
    this.resetFromJSON(this.lsData.get(DefaultAppConfig.rttimerToJSONKey))
    console.log('rtt load:' + '\n' + JSON.stringify(this));
    return this;
  }
  expired(timerInfo) {
    console.log(`${timerInfo.name} expired - emit ${timerInfo.timer.data}`)
    this.emit(`${timerInfo.name}`);
    this.removeTimers(timerInfo.name); //getTimers by name then remove all
  }
  check() {
    var rttProgress = this.getTimersProgress();
    for (var i = 0, cnt = rttProgress.length; i < cnt; i++) {
        var timerInfo = rttProgress[i];
        if(timerInfo.progress == 1){
          this.expired(timerInfo)
        }
    }
    return this;
  }
}

export default RTTimers;