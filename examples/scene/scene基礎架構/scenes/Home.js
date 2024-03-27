import Base from './Base.js';
import initMasterScene from '../gdk/scene/InitMasterScene.js';
import { DefaultAppConfig } from '../settings/DefaultData.js';
//scripts
import CreateParallelBackgrounds from '../scripts/CreateParallelBackgrounds.js';
import Locate from '../gdk/layer/Locate.js';

class Home extends Base {
    constructor() {
        super({
            key: DefaultAppConfig.sceneKey.Home
        })
    }
    init(){
        initMasterScene(this);
    }
    preload(){
    }
    create() {
        var scene = this;
        var buttons = this.rexUI.add.buttons({
            width: 400,
            orientation: 'y',
            buttons: [
                createButton(this, labelStyle, 'AAA'),
                createButton(this, labelStyle, 'BBB'),
                createButton(this, labelStyle, 'CCC'),
                createButton(this, labelStyle, 'DDD'),
            ],
            space: { item: 16 },
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
        
        Locate(scene, buttons, {
            instID: 'testBtns',
            layerName: 'ui', 
            viewport: scene.viewport, 
            vpx: 0.3, 
            vpy: 0.3,
        })
    }
}

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

var labelStyle = {

    background: {
        radius: 10,
        color: COLOR_DARK,
        'active.color': COLOR_PRIMARY,
        strokeWidth: 0,
        'hover.strokeColor': 0xffffff,
        'hover.strokeWidth': 2
    },
    icon: {
        key: 'ico_arrowL',
        'active.key': 'ico_yes',
        'hover.glowColor': 0xff0000,
    },          
    text: {
        $type: 'text',
        fontSize: 64,

        'active.fontStyle': 'bold',
        'active.color': 'yellow',
    },
    space: {
        left: 10, right: 10, top: 10, bottom: 10,
        icon: 10,
    },

}

var createButton = function (scene, style, text) {
    return scene.rexUI.add.simpleLabel(style)
        .resetDisplayContent({
            text: text,
            icon: true,
        })
        .setName(text);
}

export default Home;