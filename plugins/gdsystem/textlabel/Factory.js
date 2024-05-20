import ObjectFactory from '../ObjectFactory.js';
import { Label } from '../../../../phaser3-rex-notes/templates/ui/ui-components.js';

ObjectFactory.register('textLabel', function (x, y, text) {
    var gameObject = this.scene.rexUI.add.label({
        x: x, y: y,
        text: this.scene.add.text(0, 0, text)
    });
    this.scene.add.existing(gameObject);
    return gameObject;
});
