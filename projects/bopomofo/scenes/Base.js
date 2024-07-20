import 'phaser';

class Base extends Phaser.Scene {

    addGlobalProperty(propertyName, value) {
        // Add new getter and setter
        if (!Base.prototype.hasOwnProperty(propertyName)) {
            let globalInstance;
            Object.defineProperty(
                Base.prototype,
                propertyName,
                {
                    get() {
                        return globalInstance;
                    },
                    set(value) {
                        globalInstance = value;
                    }
                })
        }

        // Assign value
        this[propertyName] = value;

        // If value is an object
        if ((value !== null) && (typeof (value) === 'object')) {
            var obj = value;
            this.game.events.on('destroy', function () {
                // Invoke destroy method if it has
                if (obj.destroy) {
                    obj.destroy;
                }
                // Clear reference
                this[propertyName] = undefined;
            }, this)
        }

        return this;
    }

    create() {
    }
}

export default Base;