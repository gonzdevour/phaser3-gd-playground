//utils
import GetValue from '../../../../../plugins/utils/object/GetValue.js';

const DEG_TO_RAD = Math.PI / 180;

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
*/

var CreateModalKnob = function(scene, config){

    if (config == undefined){
        config = {};
    }

    var knobText = GetValue(config, 'text', CreateKnobTextLabel(scene))

    var knob = scene.rexUI.add.knob({
        x: scene.viewport.centerX,
        y: scene.viewport.centerY,
        // anchor: undefined,
        width: 500,
        height: 500,    
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0x4e342e).setStrokeStyle(1, 0x7b5e57),
    
        color: GetValue(config, 'color', 0x000000),
        trackColor: GetValue(config, 'trackColor', 0xffffff),
        centerColor: GetValue(config, 'centerColor', 0x000000),
        thickness: GetValue(config, 'thickness', 0.2),
        startAngle: GetValue(config, 'startAngle', 270)*DEG_TO_RAD,
        anticlockwise: GetValue(config, 'anticlockwise', false),
        //knobDepth: 0,
    
        text: knobText,
        textFormatCallback: GetValue(config, 'textFormatCallback', knobTextCallback),
        //textFormatCallbackScope: undefined,
    
        input: 'click',
    
        value: 0.5,
        //gap: undefined, //一格一格前進
        easeValue: {
            duration: 0,
            ease: 'Linear'
        },
        //valuechangeCallback: function(newValue, oldValue, knob) {},
    
        space: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        },
    
        enable: true,
    
        // name: '',
        // draggable: false,
        // sizerEvents: false,
    })
    .layout()

    return knob;
}

var CreateKnobTextLabel = function(scene){
    scene.rexUI.add.label({
        text: scene.add.text(0, 0, '', { fontSize: '30px'}),
        icon: scene.add.image(0, 0, 'speak'),
        space: {icon: 10},
    })
}

var knobTextCallback = function (value) {
    return Math.floor(value * 100)+'%';
}

export default CreateModalKnob;