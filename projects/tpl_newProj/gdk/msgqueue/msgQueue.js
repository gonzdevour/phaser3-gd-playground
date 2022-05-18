import PenddingMessages from "../../../../plugins/pendding-messages/PenddingMessages";
import { DefaultAppConfig } from "../../settings/DefaultData";

//utils
import GetValue from "../../../../plugins/utils/object/GetValue";

class msgQueue extends PenddingMessages {
  constructor(lsData,config) {
    super();
    this.lsData = lsData;
    this.name = GetValue(config, 'name', 'main');
    this.lsKey = DefaultAppConfig.msgQueueToJSONKey + '.' + this.name;
    if (this.lsData.has(this.lsKey)){
      this.load();
    }
    this
      .on('update', function () {
        console.log(`msgQ.${this.name} updated:`+ '\n' + JSON.stringify(this));
        this.save();
      },this)
      .on('push', function(msg){
        console.log('msgQpushed')
        this.startPop();
    })
  }
  setPopCallback(cbk,scope) {
    this.popCallback = cbk;
    this.popCallbackScope = scope;
    return this;
  }
  async startPop() {
    var cbk = this.popCallback;
    var scope = this.popCallbackScope;
    if (this.isPoppingAll) {
      return;
    }
    this.isPoppingAll = true;
    if(cbk && scope){
      await this.popAll(cbk, scope);
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

export default msgQueue;