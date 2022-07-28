import msgQueue from "../../../../plugins/msgqueue/msgQueue.js";
import { DefaultAppConfig } from "../../DefaultData";

//pendingMessage with lsData
var CreateMsgQueue = function (name, lsData) {
  var config = {
    name: name,
    lsKeyHeader: DefaultAppConfig.msgQueueToJSONKey,
  };
  var msgQ = new msgQueue(lsData, config);
  return msgQ;
}

export default CreateMsgQueue;
