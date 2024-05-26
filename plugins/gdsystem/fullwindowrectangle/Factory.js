import ObjectFactory from '../ObjectFactory.js';
import FullWindowRectangle from './FullWindowRectangle.js';

ObjectFactory.register('fullWindowRectangle', function (color, alpha, layer) {
    var gameObject = new FullWindowRectangle(this.scene, color, alpha);
    this.scene.add.existing(gameObject);
    this.system.layerManager.addToLayer(layer, gameObject);

    return gameObject;
});
