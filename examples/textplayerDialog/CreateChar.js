import phaser from 'phaser/src/phaser.js';

var CreateChar = function(scene){
    var character = scene.add.rexLive2d(scene.viewport.centerX, scene.viewport.centerY, 'Haru')
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

    return character;
}

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

var CreateLive2DMotionSelector = function(scene, character){
    var options = character.getMotionNames();

    var print = scene.add.text(300, 0, '', { fontSize: 24, padding: 3 });
    var dropDownList = scene.rexUI.add.dropDownList({
        x: 180, y: 50,

        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY),
        icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, COLOR_LIGHT),
        text: CreateTextObject(scene, '-- Select --').setFixedSize(270, 0),
        space: { left: 10, right: 10, top: 10, bottom: 10, icon: 10 },

        options: options,

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
            onButtonClick: function (button, index, pointer, event) {
                // Set label text, and value
                scene.text = button.text;
                scene.value = button.value;
                print.text += `Select ${button.text}, value=${button.value}\n`;
            },

            // scope: dropDownList
            onButtonOver: function (button, index, pointer, event) {
                button.getElement('background').setStrokeStyle(1, 0xffffff);
            },

            // scope: dropDownList
            onButtonOut: function (button, index, pointer, event) {
                button.getElement('background').setStrokeStyle();
            },
            space: { item: 10 },
        },

        setValueCallback: function (dropDownList, value, previousValue) {
            console.log(value);
        },
        value: undefined

    })
        .layout();
}

var CreateTextObject = function (scene, text) {
    return scene.add.text(0, 0, text, { fontSize: 36, padding: 3 })
}

export default CreateChar;