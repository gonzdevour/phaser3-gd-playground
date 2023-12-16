import CreateRoundRectangleBackground from "./CreateRoundRectangleBackground";

const COLOR_PRIMARY = 0x111111; //#111111
const COLOR_LIGHT = 0xffd900; //#ffd900
const COLOR_DARK = 0x222222;

var CreateBar = function(scene, config){

    if (config == undefined){
        config = {};
    }

    var bar = scene.rexUI.add.numberBar({
        x: scene.viewport.centerX,
        y: scene.viewport.centerY,
        width: 600,
        // anchor: undefined,
        //background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0x4e342e).setStrokeStyle(1, 0x7b5e57),
        //icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xffffff),
    
        slider: {
            // width: 120, // Fixed width
            //background: sliderBackgroundGameObject,
            track: scene.rexUI.add.roundRectangle(0, 0, 0, 36, 18, COLOR_PRIMARY),
            indicator: scene.rexUI.add.roundRectangle(0, 0, 0, 36, 18, COLOR_LIGHT),
            //thumb: sliderThumbGameObject,
            input: 'none',
            easeValue: {
                duration: 2000,
                ease: 'Linear'
            },
        },

        text: CreateActionLabel(scene, '100%').layout().setMinWidth(50*3),
        value: 0,
        easeValue: { duration: 2000, ease: 'Linear' },
        valuechangeCallback: function(newValue, oldValue, bar) { bar.text = barTextCallback(newValue); },
        space: { left: 10, right: 10, top: 10, bottom: 10, icon: 10, slider: 10 },
        enable: true,
    })
    //.layout()//modal會layout所以不需要在建立時就layout

    return bar;
}

var CreateActionLabel = function (scene, text, img, radius, pos) {
    return scene.rexUI.add.label({
      //background: CreateRoundRectangleBackground(scene, radius, undefined, 0xffffff, 2),
      icon: !img ? undefined : scene.add.image(0, 0, img).setDisplaySize(72, 72),
      text: !text ? undefined : scene.rexUI.add.BBCodeText(0, 0, text, { fontSize: 60 }),
      space: { left: 10, right: 10, top: 10, bottom: 10, icon: 0 },
      align: 'center'
    });
  }

var barTextCallback = function (value) {
    return Math.floor(value * 100)+'%';
}

export default CreateBar;