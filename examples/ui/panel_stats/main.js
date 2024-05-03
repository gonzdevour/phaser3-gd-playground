import 'phaser';
import AllPlugins from 'gdkPlugins/AllPlugins.js';

const COLOR_PRIMARY = 0xffffff; // #4e342e
const COLOR_LIGHT = 0xffffff; // #7b5e57
const COLOR_DARK = 0x333333; // #333333

class Test extends Phaser.Scene
{
    preload ()
    {
        this.load.pack('pack', 'assets/pack.json');
    }

    create ()
    {
        var scene = this;

        var dataList = [
            { name: 'hp', text: '體力', valueCur: 90, valueMin: 0, valueMax: 100, },
            { name: 'mp', text: '魔力', valueCur: 0, valueMin: 0, valueMax: 100, },
            { name: 'lv', text: '等級', valueCur: 80, valueMin: 0, valueMax: 100, },
            { name: 'exp', text: '經驗', valueCur: 100, valueMin: 0, valueMax: 100, },
        ]

        var gridSizer = createGridSizer(scene);

        var tuners = gridSizer.getElement('items');
        dataList.forEach((data, index) => {
            var tuner = tuners[index];
            tuner.setName('tuner_'+ data.name);

            var nvLabel = tuner.getByName('nvLabel');
            nvLabel.setName('nvLabel_'+ data.name);
            nvLabel.setNameText(data.text);
            nvLabel.setValue(data.valueCur, data.valueMin, data.valueMax);

            var buttons = tuner.getByName('buttons');
            buttons.setName('buttons_'+ data.name);
            buttons.on('button.click', function (button, index, pointer, event) {
                switch (index) {
                    case 0: //減
                    statAdd(dataList, data.name, -5)
                    statUIUpdate(gridSizer, data);
                    break;
                    case 1: //加
                    statAdd(dataList, data.name, 5)
                    statUIUpdate(gridSizer, data);
                    break;
                }
            },scene)

            //name都設定完成後，更新UI
            statUIUpdate(gridSizer, data);
        });
    }
    update ()
    {
    }
}

var statAdd = function(dataList, name, value2add){
    var data = dataList.find(obj => obj.name === name);
    data.valueCur = Phaser.Math.Clamp(data.valueCur+value2add, data.valueMin, data.valueMax);
}

var statUIUpdate = function(gridSizer, data){
    var name = data.name;

    var nvLabel = gridSizer.getByName('nvLabel_'+ name, true);
    //nvLabel.setValue(data.valueCur, data.valueMin, data.valueMax);
    nvLabel.setEaseValueDuration(200).easeValueTo(data.valueCur);

    var buttons = gridSizer.getByName('buttons_'+ name, true);
    var button0 = buttons.getButton(0);
    var button1 = buttons.getButton(1);
    if (data.valueCur == data.valueMin){
        button0.setDisableState(true);
        button1.setDisableState(false);
    } else if (data.valueCur == data.valueMax){
        button0.setDisableState(false);
        button1.setDisableState(true); 
    } else {
        button0.setDisableState(false);
        button1.setDisableState(false);        
    }
}

var createGridSizer = function(scene){
    return scene.rexUI.add.gridSizer({
        x: 400, y: 300,
        width: 400, height: 400,
        column: 1, row: 4,
        columnProportions: 1, rowProportions: 1,
        space: {
            top: 20, bottom: 20, left: 20, right: 20,
            column: 20, row: 20
        },
        createCellContainerCallback: function (scene, x, y, config) {
            //config.align = 'center';
            //config.padding = {left: 0, right: 0, top: 0, bottom: 0};
            //config.key = undefined; //Add this child into childMap, which could be read back by sizer.getElement(key)
            //config.expand = false;
            return CreateTuner(scene)
        }
    })
    .addBackground( scene.rexUI.add.roundRectangle(0, 0, 2, 2, 10).setStrokeStyle(2, COLOR_LIGHT), {
        left: 0, right: 0, top: 0, bottom: 0
    }, 'background')
    .layout()
}

var CreateTuner = function(scene){
    var nameValueLabel = CreateNameValueLabel(scene);
    var buttons = createButtons(scene);
    var sizer = scene.rexUI.add.sizer(0, 0, {
        orientation: 'x',
        // rtl: false, startChildIndex: 0, anchor: undefined,
        // width: undefined, height: undefined, 
        // draggable: false, sizerEvents: false, enableLayer: false,
        // space: { left: 0, right:0, top:0, bottom:0, item:0 },
    })
    .add(nameValueLabel, {
        align: 'center',
        expand: false,
        //proportion: 0,
        //padding: {left: 0, right: 0, top: 0, bottom: 0},
        //key: undefined, index: undefined, 
        //minWidth: undefined, minHeight: undefined, fitRatio: 0,  // true
    })
    .add(buttons, {
        align: 'center',
        expand: true,
        //proportion: 1,
        //padding: {left: 0, right: 0, top: 0, bottom: 0},
        //key: undefined, index: undefined, 
        //minWidth: undefined, minHeight: undefined, fitRatio: 0,  // true
    })

    return sizer;
}

var simpleLabelStyle = {
    background: {
        radius: 10,
        color: COLOR_DARK,
        'disable.color': 0x111111,
        'active.color': COLOR_PRIMARY,
        strokeWidth: 0,
        'hover.strokeColor': 0xffffff,
        'hover.strokeWidth': 2
    },
    // icon: {
    //     key: 'ico_arrowL',
    //     'active.key': 'ico_yes',
    //     'hover.glowColor': 0xeeeeee,
    // },
    //iconSize:32,          
    text: {
        $type: 'text',
        fontSize: 64,
        testString: '|MÉqgy回',

        'active.fontStyle': 'bold',
        'active.color': 'black',
    },
    align: 'center',
    space: {
        left: 10, right: 10, top: 10, bottom: 10,
        icon: 10,
    },

}

var createSimpleLabel = function (scene, style, text) {
    return scene.rexUI.add.simpleLabel(style)
        .resetDisplayContent({
            text: text,
            //icon: true,
        })
        .setName('sLabel_' + text);
}

var createButtons = function (scene) {
    return scene.rexUI.add.buttons({
        width: 200,
        orientation: 'x',
        buttons: [
            createSimpleLabel(scene, simpleLabelStyle, '-'),
            createSimpleLabel(scene, simpleLabelStyle, '+'),
        ],
        expand: true,
        space: { left: 16, item: 16 },
        buttonsType: undefined, //'radio', 'checkboxes'
    })
        .setName('buttons')
        .on('button.statechange', function (button, index, value, previousValue) {
            button.setActiveState(value);
        })
        .on('button.over', function (button, index, pointer, event) {
            button.setHoverState(true);
        })
        .on('button.out', function (button, index, pointer, event) {
            button.setHoverState(false);
        })
}

var CreateNameValueLabel = function (scene) {
    return scene.rexUI.add.nameValueLabel({
        width: 270, height: 40,
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 10).setStrokeStyle(2, COLOR_LIGHT),
        //icon: scene.add.rectangle(0, 0, 20, 20, 0xa98274),
        nameText: scene.rexUI.add.BBCodeText(0, 0, 'HP', { fontSize: 36, testString: '|MÉqgy回', }),
        valueText: scene.rexUI.add.BBCodeText(0, 0, '0/100', { fontSize: 36 }),
        valueTextFormatCallback: function (value, min, max) {
            value = Math.floor(value);
            if (value <= max * 0.3) {
                value = `[color=red][b]${value}[/b][/color]`;
            } else {
                value = `[b]${value}[/b]`;
            }
            return `${value}/${max}`;
        },
        //bar: {
            // height: 6,
            // barColor: COLOR_PRIMARY,
            // barColor2: COLOR_DARK,
            // trackColor: COLOR_DARK,
            // trackStrokeColor: COLOR_LIGHT
        //},
        align: {
        },
        space: {
            left: 20, right: 20, top: 20, bottom: 20,
            //text: 0, 
            //icon: 10, iconTop: 0, iconBottom: 0,
            //value: 0, bar:-6, barBottom: 0, barLeft: 0, barRight: 0,
            //name: 0,
            //actionTop: 0, actionBottom: 0,
        }

    })
    .setName('nvLabel')
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1024,
    height: 800,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Test
};

const game = new Phaser.Game(config);