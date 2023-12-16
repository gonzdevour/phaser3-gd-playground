//utils
import GetValue from "../../../../plugins/utils/object/GetValue";

const DEG_TO_RAD = Math.PI / 180;

/*
config:{
    //文字
    text
    knobTextCallback
    //色彩樣式
    barColor
    trackColor
    centerColor
    thickness
    //方向
    startAngle
    anticlockwise
}
*/

var CreateKnob = function(scene, config){

    if (config == undefined){
        config = {};
    }

    var knob = scene.rexUI.add.knob({
        x: scene.viewport.centerX,
        y: scene.viewport.centerY,
        // anchor: undefined,
        width: 500,
        height: 500,    
        //background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0x4e342e).setStrokeStyle(1, 0x7b5e57),
    
        barColor: GetValue(config, 'barColor', 0xeeeeee),
        trackColor: GetValue(config, 'trackColor', 0x111111),
        //centerColor: GetValue(config, 'centerColor', 0x000000),
        thickness: GetValue(config, 'thickness', 0.1),
        startAngle: GetValue(config, 'startAngle', 270)*DEG_TO_RAD,
        anticlockwise: GetValue(config, 'anticlockwise', false),
        //knobDepth: 0,
    
        text: CreateKnobTextLabel(scene), //如果預先產生的話就得處理排序/被蓋掉的問題
        textFormatCallback: GetValue(config, 'textFormatCallback', knobTextCallback),
        //textFormatCallbackScope: undefined,
    
        input: 'none', //'click'
    
        value: 0,
        //gap: undefined, //一格一格前進
        easeValue: {
            duration: 2000,
            ease: 'Linear'
        },
        //valuechangeCallback: function(newValue, oldValue, knob) {},
    
        space: {
            left: 30,
            right: 30,
            top: 30,
            bottom: 30,
        },
    
        enable: true,
    
        // name: '',
        // draggable: false,
        // sizerEvents: false,
    })
    //.layout()//modal會layout所以不需要在建立時就layout

    return knob;
}

var CreateKnobTextLabel = function(scene){
    var label = scene.rexUI.add.label({
        text: scene.rexUI.add.BBCodeText(0, 0, '', { fontSize: '72px'}),
        //icon: scene.add.image(0, 0, 'speak'),
        space: {left: 20, icon: 10},
    })
    return label;
}

var knobTextCallback = function (value) {
    return Math.floor(value * 100)+'%';
}

export default CreateKnob;