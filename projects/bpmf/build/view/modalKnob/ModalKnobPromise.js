import CreateModalKnob from "./CreateModalKnob";

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
    var knob = CreateModalKnob(scene, config)
        .layout()
        .on('loadingComplete', function () {
            scene.rexUI.modalClose(knob, {});
        })

    config.manualClose = false;//不可手動關閉
    //knob.drawBounds(scene.add.graphics(), 0xff0000);

    //將knob再包裝為modal，並建立promise
    return scene.rexUI.modalPromise(knob, config);
}

export default ModalKnobPromise;