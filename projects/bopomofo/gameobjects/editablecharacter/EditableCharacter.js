import Character from '../character/Character';
import KeyboardToBopomofo from '../../behavior/keyboardtobopomofo/KeyboardToBopomofo';

var LastEditingCharacter = undefined;

class EditableCharacter extends Character {
    constructor(scene, config) {
        super(scene, config);

        this.bopomofoEditor = undefined;

        this
            .once('destroy', function () {
                if (this.bopomofoEditor) {
                    this.stopEdit();
                }
            }, this)
    }

    startEdit() {
        if (LastEditingCharacter === this) {  // Already started
            return this;
        } else if (LastEditingCharacter) {  // Another character is editing
            LastEditingCharacter.stopEdit();
        }
        LastEditingCharacter = this;

        this.bopomofoEditor = new KeyboardToBopomofo(this.scene)
            .on('change', function (bopomofo, typeName) {
                this.setBopomofo(bopomofo);
                this.getTopmostSizer().layout();  // Run layout

                if (typeName === 'tone') {
                    this.stopEdit();
                }
            }, this)

        this.emit('startedit', this);

        return this;
    }

    stopEdit() {
        if (this.bopomofoEditor === undefined) {
            return this;
        }

        LastEditingCharacter = undefined;
        this.bopomofoEditor.destroy();
        this.bopomofoEditor = undefined;

        this.emit('stopedit', this);

        return this;
    }
}

export default EditableCharacter;