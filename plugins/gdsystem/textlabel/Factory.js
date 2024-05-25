import ObjectFactory from '../ObjectFactory.js';

ObjectFactory.register('textLabel', function (x, y, layer, text) {
    var gameObject = this.scene.rexUI.add.label({
        x: x, y: y,
        text: this.scene.add.text(0, 0, text)
    });
    this.scene.layerManager.addToLayer(layer, gameObject);

    return gameObject;
});
