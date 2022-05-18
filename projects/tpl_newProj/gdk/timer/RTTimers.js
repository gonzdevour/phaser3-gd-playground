import RealTimeTimers from "../../../../../phaser3-rex-notes/plugins/realtimetimers";
import { DefaultAppConfig } from "../../settings/DefaultData";

//utils
import GetValue from "../../../../plugins/utils/object/GetValue";

class RTTimers extends RealTimeTimers {
  constructor(lsData, config) {
    super(config);
    this.lsData = lsData;
    this.name = GetValue(config, 'name', 'rttimer');
    this.lsKey = DefaultAppConfig.rttimerToJSONKey + '.' + this.name;
    if(config.pushPeriodCallback){
      this.pushPeriodCallback = config.pushPeriodCallback;
    }
    if(config.expiredCallback){
      this.expiredCallback = config.expiredCallback;
    }
    this
      .on('update', function () {                
        //console.log(`${this.name}Updated:` + '\n' + JSON.stringify(this));
        // Save to localstorage or server here
        this.save()
      },this)
      .on('remove', function (t, tArr) {                
        console.log(`${this.name} removed timer:` + '\n' + JSON.stringify(t));
      },this)
      .on('expired',function(timerInfo){
        this.removeTimers(timerInfo.name);
        var data = GetValue(timerInfo, 'timer.data', undefined);
        console.log(`${data.id} expired`)
        var cbk = this.expiredCallback;
        var scope = this.expiredCallbackScope
        if(cbk){
          cbk.call(scope, data); //scope可以是null所以不用檢查
        }
      },this)
      .load()
  }
  startRealTime() {
    this.check();
    setInterval(this.check.bind(this), 1000);
    return this;
  }
  pushTime(period) { //example: {s:5}
    this.pushPeriodCallback(period);
    this.check();
    return this;
  }
  save() {
    //console.log('rtt save' + '\n' + JSON.stringify(this));
    this.lsData.set(this.lsKey, this.toJSON());
    return this;
  }
  load() {
    this.resetFromJSON(this.lsData.get(this.lsKey))
    console.log(`${this.name} loaded` + '\n' + JSON.stringify(this));
    return this;
  }
/*   expired(timerInfo) {
    console.log(`${this.name}-${timerInfo.name}-expired → emit ${timerInfo.timer.data}`)
    this.emit(`${timerInfo.name}`);
    this.removeTimers(timerInfo.name); //getTimers by name then remove all
  } */
  check() {
    var rttProgress = this.getTimersProgress();
    for (var i = 0, cnt = rttProgress.length; i < cnt; i++) {
        var timerInfo = rttProgress[i];
        if(timerInfo.progress == 1){
          this.emit('expired', timerInfo) //timerInfo.name, timerInfo.timer.data
        }
    }
    return this;
  }
  setExpiredCallback(cbk,scope){
    this.expiredCallback = cbk;
    this.expiredCallbackScope = scope;
    return this;
  }
}

export default RTTimers;