import ObjectFactory from './ObjectFactory.js';
import { OnSceneStart, OnSceneStop } from './OnSceneStartStop.js';
import TextLabelFactory from './textlabel/Factory.js';
import FullWindowRectangleFactory from './fullwindowrectangle/Factory.js';
//utils
import DisplayListMethods from 'rexnotePlugins/utils/gameobject/displaylist/DisplayListMethods.js';
import myMethods from './myMethods.js';

class GDSystemPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        // Private objects of this GD system
        this.viewport; // Phaser.Geom.Rectangle;
        this.vpc; //viewport coordinate
        this.layerManager;  // scene.rexUI.add.layerManager
        this.vpRect; // scene.rexUI.add.roundRectangle

        this.add = new ObjectFactory(this);
    }

    boot() {
        Object.assign(
            Phaser.GameObjects.GameObject.prototype, //對所有gameObject賦予自訂屬性
            DisplayListMethods,
            myMethods,
        );
        Object.assign(
            Phaser.GameObjects.Shape.prototype, //對所有shape賦予自訂屬性
            DisplayListMethods,
            myMethods,
        );
        var eventEmitter = this.scene.events;
        eventEmitter
            .on('destroy', this.destroy, this)
            .on('start', OnSceneStart, this) //scene啟動時執行
            .on('shutdown', OnSceneStop, this)
    }

    destroy() {
        this.add.destroy();
        super.destroy();
    }
}
export default GDSystemPlugin;