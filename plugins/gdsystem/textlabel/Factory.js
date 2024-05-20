import ObjectFactory from '../ObjectFactory.js';

ObjectFactory.register('textLabel', function (x, y, text, config) {
    var gameObject = new Phaser.GameObjects.Text(this.scene, x, y, text, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});
