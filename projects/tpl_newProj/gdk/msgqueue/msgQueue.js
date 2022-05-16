import PenddingMessages from "../../../../plugins/pendding-messages/PenddingMessages";
import { DefaultAppConfig } from "../../settings/DefaultData";

//utils
import GetValue from "../../../../plugins/utils/object/GetValue";

class msgQueue1 extends PenddingMessages {
  constructor(lsData,config) {
    super();
    this.lsData = lsData;
    this.name = GetValue(config, 'name', 'main');
    this.lsKey = DefaultAppConfig.msgQueueToJSONKey + '.' + this.name;
    if (this.lsData.has(this.lsKey)){
      this.load();
    }
    if (!this.isEmpty){
      this.emit('start');
    }
    this
      .on('update', function () {
        console.log(`msgQ.${this.name} updated:`+ '\n' + JSON.stringify(this));
        this.save();
      },this)
  }
  async startPop(callback, callbackScope) {
    if (this.isPoppingAll) {
      return;
    }
    this.isPoppingAll = true;
    if(callback && callbackScope){
      await this.popAll(callback, this.callbackScope);
    }
    //popAll結束
    this.isPoppingAll = false;
    return this;
  }
  save() {
    this.lsData.set(this.lsKey, this.toJSON());
    return this;
  }
  load() {
    this.resetFromJSON(this.lsData.get(this.lsKey))
    console.log(`msgQueue.${this.name} loaded` + '\n' + JSON.stringify(this));
    return this;
  }
}

export default msgQueue1;