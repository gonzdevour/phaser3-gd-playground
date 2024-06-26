import { Align } from "phaser/src/display";

const COLOR_PRIMARY = 0x999999;
const COLOR_LIGHT = 0x666666;
const COLOR_DARK = 0x333333;

var labelStyle = {

    background: {
        radius: 10,
        color: COLOR_DARK,
        'active.color': COLOR_PRIMARY,
        strokeWidth: 0,
        'hover.strokeColor': 0xffffff,
        'hover.strokeWidth': 2
    },        
    text: {
        $type: 'text',
        fontSize: 32,
        testString: '|MÉqgy回',

        'active.fontStyle': 'bold',
        'active.color': 'black',
    },
    space: {
        left: 10, right: 10, top: 10, bottom: 10,
        icon: 10,
    },
    align: 'center',
}

var createButton = function (scene, style, text) {
    return scene.rexUI.add.simpleLabel(style)
        .resetDisplayContent({
            text: text,
            icon: false,
        })
        .setName(text);
}

var createButtons = function(scene){
    return scene.rexUI.add.buttons({
        width: 200,
        orientation: 'y',
        buttons: [
            createButton(scene, labelStyle, 'fadeIn'),
            createButton(scene, labelStyle, 'fadeOut'),
            createButton(scene, labelStyle, 'fadeFrom'),
            createButton(scene, labelStyle, 'fade'),
            createButton(scene, labelStyle, 'flash'),
            createButton(scene, labelStyle, 'shake'),
        ],
        space: { left:16, top:16, item: 16, bottom: 16, },
        buttonsType: 'radio'
    })
        .layout()
        .on('button.statechange', function (button, index, value, previousValue) {
            button.setActiveState(value);
        })
        .on('button.over', function (button, index, pointer, event) {
            button.setHoverState(true);
        })
        .on('button.out', function (button, index, pointer, event) {
            button.setHoverState(false);
        })
        .changeOrigin(0,1)
        ._locate({
            layerName: "ui",
            vpx: 0,
            vpy: 1,
        })
}

var CreateCameraEffectControlButtons = function(scene, camera){
    var duration = 1000;
    return createButtons(scene)
        .on('button.click', function (button, index, pointer, event) {
            switch (index) {
                case 0:
                    camera.fadeIn(duration)
                break;
                case 1:
                    camera.fadeOut(duration)
                break;
                case 2:
                    camera.fadeFrom(duration) //以目前色調為目標色調
                break;
                case 3:
                    camera.fade(duration) //從透明到目標色調
                break;
                case 4:
                    camera.flash(duration)
                break;
                case 5:
                    camera.shake(duration)
                break;
            }
        },scene)
}

export default CreateCameraEffectControlButtons;