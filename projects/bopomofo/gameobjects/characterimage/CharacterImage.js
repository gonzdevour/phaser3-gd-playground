const Image = Phaser.GameObjects.Image;
class CharacterImage extends Image {
    constructor(scene, x, y, font, text) {
        super(scene, x, y, font, text);

        this._text = text;
    }

    get text() {
        return this._text;
    }

    set text(text) {
        this._text = text;
        this.setFrame(text);
    }

    setText(text) {
        this.text = text;
        return this;
    }

    setColor(color) {
        this.setTint(color);
        return this;
    }
}

export default CharacterImage;