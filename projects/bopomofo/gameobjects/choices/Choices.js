import UI from '../../../../plugins/ui-components.js';

const Sizer = UI.Sizer;
const Buttons = UI.Buttons;
const GetValue = Phaser.Utils.Objects.GetValue;
const GroupNames = ['initials', 'media', 'vowel', 'tone'];

class Choices extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        if (!config.hasOwnProperty('space')) {
            config.space = {};
        }


        config.space.item = GetValue(config, 'space.row', config.space.item);
        config.orientation = 'y';
        super(scene, config);
        scene.add.existing(this);

        var background = GetValue(config, 'background');
        if (background) {
            this.addBackground(background);
        }

        var buttonsSpace = {
            item: GetValue(config, 'space.column', 0),
        }
        for (var i = 0, icnt = GroupNames.length; i < icnt; i++) {
            let groupName = GroupNames[i];
            let buttons = GetValue(config, groupName);
            for (var j = 0, jcnt = buttons.length; j < jcnt; j++) {
                buttons[j].name = j.toString();
            }

            let buttonsSizer = new Buttons(scene, {
                type: 'radio',
                orientation: 'x',
                buttons: buttons,
                space: buttonsSpace,
                expand: true,
                eventEmitter: this,
                groupName: groupName,
                setValueCallback: function (button, value, previousValue) {
                    var eventName = (value) ? 'select' : 'unselect';
                    this.emit(eventName, button, groupName);
                },
                setValueCallbackScope: this
            })


            this
                .add(
                    buttonsSizer,
                    { proportion: 1, expand: true }
                )
                .addChildrenMap(groupName, buttons)
                .addChildrenMap(`${groupName}Sizer`, buttonsSizer)
        }

        this.clearChoices();
    }

    setChoicesText(data) {
        for (var i = 0, icnt = GroupNames.length; i < icnt; i++) {
            var groupName = GroupNames[i];
            var textArray = data[groupName];
            if (!textArray) {
                continue;
            }

            var buttons = this.getElement(groupName);
            var jcnt = Math.min(textArray.length, buttons.length);
            for (var j = 0; j < jcnt; j++) {
                buttons[j].setText(textArray[j]);
            }
        }

        return this;
    }

    clearChoices() {
        for (var i = 0, icnt = GroupNames.length; i < icnt; i++) {
            var groupName = GroupNames[i];
            this.getElement(`${groupName}Sizer`).setData('value', null);
        }
        return this;
    }

    getChoiceResult() {
        var result = {};
        for (var i = 0, icnt = GroupNames.length; i < icnt; i++) {
            var groupName = GroupNames[i];
            result[groupName] = parseInt(this.getElement(`${groupName}Sizer`).value);
        }
        return result;
    }
}

export default Choices;