import CreateKnob from "./build/view/style/CreateKnob";

//utils
import GetValue from '../../plugins/utils/object/GetValue.js';

/*
config:{
    //文字
    text
    knobTextCallback
    //色彩樣式
    color
    trackColor
    centerColor
    thickness
    //方向
    startAngle
    anticlockwise
}
都有給預設值，所以config可以不給值
*/

var ModalKnobPromise = function (scene, config) {
    config = !config?{}:config; 
    var knob = CreateKnob(scene, config)
        .layout()
    config.returnKnob = knob;
    config.manualClose = GetValue(config, 'manualClose', true);//不可自動關閉
    //knob.drawBounds(scene.add.graphics(), 0xff0000);

    //將knob再包裝為modal，並建立promise
    return scene.rexUI.modalPromise(knob, config);
}

export default ModalKnobPromise;