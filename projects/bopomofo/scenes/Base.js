import 'phaser';

// Provide common methods or properties
class Base extends Phaser.Scene {
    set model(value) {
        this.registry.set('model', value);
    }
    get model() {
        return this.registry.get('model');
    }
}
export default Base;