import phaser from 'phaser/src/phaser.js';
import GetValue from '../../plugins/utils/object/GetValue';

var CreateChar = function(scene, mocName){
    var character = scene.add.rexLive2d(scene.viewport.centerX, scene.viewport.centerY, mocName)
        .setScale(0.25)
        .setRandomExpression()
        //.startMotion('Idle', undefined, 'idle')
        .on('expression.start', function (name) {
            console.log(`expression.start: ${name}`)
        })
        .on('motion.complete', function (group, no) {
            console.log(`motion.complete: ${group}_${no}`)
        })
    console.log(character.getExpressionNames());
    console.log(character.getMotionNames());

    CreateLive2DMotionSelector(scene, character);
    CreateLive2DExpressionSelector(scene, character);

    return character;
}

const COLOR_PRIMARY = 0x4e342e; //#4e342e
const COLOR_LIGHT = 0x7b5e57; //#7b5e57
const COLOR_DARK = 0x260e04; //#260e04

var CreateLive2DMotionSelector = function(scene, character){
    var config = {
        character: character,
        x: 100, y:36,
        title: 'motion',
        options: character.getMotionNames(),
        onButtonClickCallback: function (button, index, pointer, event) {
            var arr = button.value.split('_');
            var groupName = arr[0];
            var motionNum = arr[1];
            character.startMotion(groupName, motionNum);
        },
    };
    CreateDropDownList(scene, config)
}

var CreateLive2DExpressionSelector = function(scene, character){
    var config = {
        character: character,
        x: 350, y:36,
        title: 'expression',
        options: character.getExpressionNames(),
        onButtonClickCallback: function (button, index, pointer, event) {
            character.setExpression(button.value);
        },
    };
    CreateDropDownList(scene, config)
}

var CreateDropDownList = function(scene, config){
    var character = GetValue(config, 'character', undefined);
    var dropDownList = scene.rexUI.add.dropDownList({
        x: GetValue(config, 'x', 0), 
        y: GetValue(config, 'y', 0),

        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY),
        icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, COLOR_LIGHT),
        text: CreateTextObject(scene, GetValue(config, 'title', ''),),
        space: { left: 10, right: 10, top: 10, bottom: 10, icon: 10 },

        options: GetValue(config, 'options', []),

        list: {
            createBackgroundCallback: function (scene) {
                return scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_DARK);
            },
            createButtonCallback: function (scene, option, index, options) {
                var text = option;
                var button = scene.rexUI.add.label({
                    background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0),
                    text: CreateTextObject(scene, text),
                    space: {left: 10, right: 10, top: 20, bottom: 20, icon: 10},
                });
                button.value = option;

                return button;
            },

            // scope: dropDownList
            onButtonClick: GetValue(config, 'onButtonClickCallback', undefined),

            // scope: dropDownList
            onButtonOver: function (button, index, pointer, event) {
                button.getElement('background').setStrokeStyle(3, 0xffffff);
            },

            // scope: dropDownList
            onButtonOut: function (button, index, pointer, event) {
                button.getElement('background').setStrokeStyle();
            },
            space: { item: 10 },
            easeIn: 0,
            easeOut: 0,
        },

        setValueCallback: function (dropDownList, value, previousValue) {
            console.log(value);
        },
        value: undefined,

    })
        .layout();
}

var CreateTextObject = function (scene, text) {
    return scene.add.text(0, 0, text, { fontSize: 36, padding: 3 })
}

export default CreateChar;