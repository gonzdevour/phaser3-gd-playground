import ObjectFactory from '../ObjectFactory.js';

ObjectFactory.register('textLabel', function (x, y, text) {
    var gameObject = this.scene.rexUI.add.label({
        x: x, y: y,
        text: this.scene.add.text(0, 0, text)
    });
    return gameObject;
});
