import Background from '../../../../phaser3-rex-notes/plugins/gameobjects/dynamictext/dynamictext/bob/background/Background.js';
import ObjectFactory from '../ObjectFactory.js';

import GetValue from 'gdkPlugins/utils/object/GetValue.js'

ObjectFactory.register('textLabel', function (text,config) {
    var gameObject = this.scene.rexUI.add.label({
        x: 0, y: 0,
        origin: GetValue(config, 'origin', undefined),
        originX: GetValue(config, 'originX', undefined),
        originY: GetValue(config, 'originY', undefined),

        text: this.scene.rexUI.add.BBCodeText(0, 0, text, {
            fontSize: '36px',
            //backgroundColor: '#555',
            //align: 'right',
            //wrap: { mode: 'char', width: 200 },
        }),
        background: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10).setStrokeStyle(2, 0xffffff),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 }
    });
    gameObject
        .layout()
        ._locate(config)

    return gameObject;
});
