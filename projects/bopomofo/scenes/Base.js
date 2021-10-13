import 'phaser';

// Provide common methods or properties
var Model;

class Base extends Phaser.Scene {
    set model(value) {
        // Model only can be assigned once
        if (Model !== undefined) {
            return;
        }

        Model = value;

        // Free Model when game destroy
        this.game.events.on('destroy', function () {
            Model = undefined;
        })
    }
    get model() {
        return Model;
    }
}
export default Base;