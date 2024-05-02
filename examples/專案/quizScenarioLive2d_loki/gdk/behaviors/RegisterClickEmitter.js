import RegisterBehaviors from "./RegisterBehaviors";

//onClick是sizer的method，Label是一種sizer
//emit是所有p3 gameObject都有的method，從ee3導入

var RegisterClickEmitter = function (label, eventName, eventEmitter, bhvs) {
  //如果有eventName則註冊事件發射。預設發射器為label，可指定label之外的eventEmitter
  if (eventName != undefined){
      if (eventEmitter == undefined){
          eventEmitter = label;
      }
      label.onClick(function (button, label, pointer, event) { //注意onClick是Sizer專用
          eventEmitter.emit(eventName, label, pointer, event);
      })
  }
  if (bhvs){
    RegisterBehaviors(label, bhvs);
  }
  return label;
}

export default RegisterClickEmitter;