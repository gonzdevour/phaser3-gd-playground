import UI from '../../../../plugins/ui-components.js';
import { TypeNames } from '../../model/bopomofo/Bopomofo.js';

const Sizer = UI.Sizer;
const Buttons = UI.Buttons;
const GetValue = Phaser.Utils.Objects.GetValue;

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
        this.selectedButtonIndexes = {}; // Index of button

        var background = GetValue(config, 'background');
        if (background) {
            this.addBackground(background);
        }
        this.addChildrenMap('background', background);

        var buttonsSpace = {
            item: GetValue(config, 'space.column', 0),
        }
        for (var i = 0, icnt = TypeNames.length; i < icnt; i++) {
            let groupName = TypeNames[i];
            let buttons = GetValue(config, groupName);
            let buttonsSizer = new Buttons(scene, {
                orientation: 'x',
                buttons: buttons,
                space: buttonsSpace,
                expand: true,
                eventEmitter: this,
                groupName: groupName,
            })

            this
                .add(
                    buttonsSizer,
                    { proportion: 1, expand: true }
                )
                .addChildrenMap(groupName, buttons)
                .addChildrenMap(`${groupName}Sizer`, buttonsSizer)

            this.selectedButtonIndexes[groupName] = -1;
        }

        this.on('button.click', function (button, groupName, index, pointer, event) {
            var prevButtonIndex = this.selectedButtonIndexes[groupName];

            if (prevButtonIndex === index) {
                this.selectedButtonIndexes[groupName] = -1;
                this.emit('unselect', button, groupName);
            } else {
                this.selectedButtonIndexes[groupName] = index;
                if (prevButtonIndex >= 0) {
                    this.emit('unselect', this.getButton(groupName, prevButtonIndex), groupName);
                }

                this.emit('select', button, groupName);
            }

            this.emit('change', this.getChoiceResult());
        }, this);

        this.clearChoices();
    }

    getButton(groupName, index) {
        return this.getElement(groupName)[index];
    }

    setChoicesText(data) {
        for (var i = 0, icnt = TypeNames.length; i < icnt; i++) {
            var groupName = TypeNames[i];
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
        for (var groupName in this.selectedButtonIndexes) {
            var buttonIndex = this.selectedButtonIndexes[groupName];
            if (buttonIndex >= 0) {
                this.emit('unselect', this.getButton(groupName, buttonIndex), groupName);
            }
            this.selectedButtonIndexes[groupName] = -1;
        }

        this.emit('change', this.getChoiceResult());
        return this;
    }

    getChoiceResult(out) {
        if (out === undefined) {
            out = {};
        }
        for (var groupName in this.selectedButtonIndexes) {
            var value = '';
            var buttonIndex = this.selectedButtonIndexes[groupName];
            if (buttonIndex >= 0) {
                value = this.getButton(groupName, buttonIndex).text;
            }
            out[groupName] = value;
        }
        return out;
    }
}

export default Choices;