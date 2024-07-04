import Background from '../../../../phaser3-rex-notes/plugins/gameobjects/dynamictext/dynamictext/bob/background/Background.js';
import ObjectFactory from '../ObjectFactory.js';

ObjectFactory.register('textLabel', function (x, y, layer, text) {
    var gameObject = this.scene.rexUI.add.label({
        x: x, y: y,
        text: this.scene.rexUI.add.BBCodeText(0, 0, text, {
            fontSize: '36px',
            //backgroundColor: '#555',
            //align: 'right',
            //wrap: { mode: 'char', width: 200 },
        }),
        background: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10).setStrokeStyle(2, 0xffffff),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 }
    });
    this.system.layerManager.addToLayer(layer, gameObject);
    gameObject.layout();

    return gameObject;
});
