import { ColorNameToInteger } from '../../../../../phaser3-rex-notes/plugins/utils/color/ColorNameToInteger.js';

class CharacterImage extends Phaser.GameObjects.Image {
    constructor(scene, x, y, font, text) {
        super(scene, x, y, font);

        this.setText(text);
    }

    get text() {
        return this._text;
    }

    set text(text) {
        if (!text) {
            text = '';
        }

        this._text = text;
        this.setFrame(text);
    }

    setText(text) {
        this.text = text;
        return this;
    }

    setColor(color) {
        this.setTint(ColorNameToInteger(color));
        return this;
    }
}

export default CharacterImage;