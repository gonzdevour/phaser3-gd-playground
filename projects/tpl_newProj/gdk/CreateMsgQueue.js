import msgQueue from "./msgqueue/msgQueue.js";

//pendingMessage with lsData
var CreateMsgQueue = function (name, lsData) {
  var config = {
    name: name
  };
  var msgQ = new msgQueue(lsData, config);
  return msgQ;
}

export default CreateMsgQueue;
