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

        var background = GetValue(config, 'background');
        if (background) {
            this.addBackground(background);
        }
        this.addChildrenMap('background', background);

        var buttonsSpace = {
            item: GetValue(config, 'space.column', 0),
        }
        for (let i = 0, icnt = TypeNames.length; i < icnt; i++) {
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

            this
                .on(`changedata-${groupName}`, function (gameObject, value, previousValue) {
                    if (value === previousValue) {
                        return;
                    }

                    if (previousValue >= 0) {
                        this.emit('unselect', this.getButton(groupName, previousValue), groupName);
                    }

                    if (value >= 0) {
                        this.emit('select', this.getButton(groupName, value), groupName);
                    }

                    this.emit('change', this.getChoiceResult());
                }, this)
                .setData(groupName, -1);
        }

        this.on('button.click', function (button, groupName, index, pointer, event) {
            var prevButtonIndex = this.getData(groupName);

            if (prevButtonIndex === index) {
                this.setData(groupName, -1);
            } else {
                this.setData(groupName, index);
            }
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
        for (var i = 0, icnt = TypeNames.length; i < icnt; i++) {
            this.setData(TypeNames[i], -1);
        }
        return this;
    }

    getChoiceResult(out) {
        if (out === undefined) {
            out = {};
        }
        for (var i = 0, icnt = TypeNames.length; i < icnt; i++) {
            var value = '';
            var groupName = TypeNames[i];
            var buttonIndex = this.getData(groupName);
            if (buttonIndex >= 0) {
                value = this.getButton(groupName, buttonIndex).text;
            }
            out[groupName] = value;
        }
        return out;
    }
}

export default Choices;