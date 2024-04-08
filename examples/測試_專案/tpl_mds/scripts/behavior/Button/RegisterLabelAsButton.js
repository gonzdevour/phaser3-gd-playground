//onClick是sizer的method，Label是一種sizer
//emit是所有p3 gameObject都有的method，從ee3導入
//※這裡設計成：按下Label時，觸發backgroundOverlapSizery在MainMenu scene掛載的.on('eventName', callback)
var RegisterLabelAsButton = function (label, eventName, eventEmitter) {

    //給予button共通的over/out反應
    label.on('pointerover',function(pointer, localX, localY, event){
        label.setAlpha(0.6);
    });

    label.on('pointerout',function(pointer, event){
        label.setAlpha(1);
    });

    //如果有eventName則註冊事件發射。預設發射器為label，可指定label之外的eventEmitter
    if (eventName != undefined){
        if (eventEmitter == undefined){
            eventEmitter = label;
        }
        label.onClick(function (button, label, pointer, event) { //注意onClick是Sizer專用
            eventEmitter.emit(eventName, label, pointer, event);
        })
    }

}

export default RegisterLabelAsButton;